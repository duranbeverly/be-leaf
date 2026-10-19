from flask import Blueprint, request
from flask_login import current_user, login_required
from werkzeug.datastructures import FileStorage
from app.models import Review, db, Plant
from app.forms import ReviewForm
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3, uploads_enabled

# we will make this route prefix /api/reviews

review_routes = Blueprint("reviews", __name__)

# first get all reviews
@review_routes.route('')
def get_all_reviews():
    """
    Returns all the reviews made
    """
    reviews = Review.query.all()

    res = {"all_reviews": {review.id: review.to_dict() for review in reviews}}
    return res


# get a review by review id

@review_routes.route('/<int:reviewId>')
def get_single_review(reviewId):
    """
    Return a single review by review id
    """
    review_info = Review.query.get(reviewId)

    if review_info is None:
        return {"errors": {"review": ["Review not found"]}}, 404

    res = {"current_review": review_info.to_dict()}
    return res

# create a review

@review_routes.route('/new', methods=['POST'])
@login_required
def create_review():
    """
    Create a new review if you are logged in
    """


    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        plant = Plant.query.get(form.data['plant_id'])
        if plant is None:
            return {"errors": {"plant": ["Plant not found"]}}, 404

        # the photo is optional: without one (or with uploads turned off)
        # the review shows the plant's own photo
        image_url = plant.preview_image
        image = form.data.get("image")
        if isinstance(image, FileStorage) and image.filename and uploads_enabled():
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {"errors": {"image": [upload["errors"]]}}, 400
            image_url = upload['url']

        res = Review(
            user_id=current_user.id,
            plant_id=plant.id,
            rating=form.data['rating'],
            review=form.data['review'],
            image=image_url
        )
        db.session.add(res)
        db.session.commit()

        return {"current_review": res.to_dict()}
    else:
        return {"errors": form.errors}, 400

# edit a review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    """
    Edit a review if you are the owner
    """
    # check to see if current user is creator of review

    review = Review.query.get(reviewId)

    if review is None:
        return {"errors": {"review": ["Review not found"]}}, 404

    if current_user.id != review.user_id:
        return {"errors": {"review": ["You can not edit this review"]}}, 403

    # validate information
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        plant = Plant.query.get(form.data['plant_id'])
        if plant is None:
            return {"errors": {"plant": ["Plant not found"]}}, 404

        image = form.data.get("image")
        if isinstance(image, FileStorage) and image.filename and uploads_enabled():
            # upload the new image first, then delete the old one on AWS
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {"errors": {"image": [upload["errors"]]}}, 400
            remove_file_from_s3(review.image)
            review.image = upload['url']
        elif plant.id != review.plant_id and review.image == review.plants.preview_image:
            # the review was showing the old plant's photo, show the new plant's instead
            review.image = plant.preview_image

        review.plant_id = plant.id
        review.rating = form.data['rating']
        review.review = form.data['review']
        db.session.commit()
        return {"current_review": review.to_dict()}
    else:
        return {"errors": form.errors}, 400


# delete a review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    """
    Delete a review if you created it
    """
    # get review by id
    review = Review.query.get(reviewId)

    if not review:
        return {"errors": {"review": ["Review not found"]}}, 404

    # current owner should own the review
    if review.user_id != current_user.id:
        return {"errors": {"review": ["You can not delete this review"]}}, 403

    # if there is an image remove from aws
    if review.image and review.image != review.plants.preview_image:
        remove_file_from_s3(review.image)

    db.session.delete(review)
    db.session.commit()

    return{
        "message": "review deleted"
    }
