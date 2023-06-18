from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import Review, db
from app.forms import ReviewForm
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
        return {"message": "review not found"}

    res = {"current_review": review_info.to_dict()}
    return res

# create a review

@review_routes.route('/new', methods=['POST'])
@login_required
def create_review():
    """
    Create a new review if you are logged in
    """

    print("We are in the backend 💨 ", request.files.get('rating'))
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form.user_id.data = current_user.id

    # now we check for an image to upload to aws
    if form.validate():
        if "image" in form.data and form.data["image"] != None:
            image = form.data["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return upload
            else:
                res = Review(
                    user_id=form.data['user_id'],
                    plant_id=form.data['plant_id'],
                    rating=form.data['rating'],
                    review=form.data['review'],
                    image=upload['url']
                )
                db.session.add(res)
                db.session.commit()
        print("💞 here is what we are returning", res.to_dict())
        return{"current_review": res.to_dict()}
    else:
        return form.errors, 401

# edit a review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
    """
    Edit a review if you are the owner
    """
    # check to see if current user is creator of review

    review = Review.query.get(reviewId)

    if current_user.id != review.user_id:
        return {
            "message": "You can not edit this review"
        }
    # validate information
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        # delete image in aws if it exists
        if "image" in form.data and form.data['image'] != None:
            remove_file_from_s3(review.image)

            # create a new image and add to aws
            image = form.data['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return upload
            else:
                review.image = upload['url']
        review.user_id = form.data['user_id']
        review.plant_id = form.data['plant_id']
        review.rating = form.data['rating']
        review.review = form.data['review']
        db.session.commit()
        return {"current_review": review.to_dict()}
    else:
        return form.errors, 400




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
        return {
            "message": "review not found"
        }

    # current owner should own the review
    if review.user_id != current_user.id:
        return{
            "message": "unauthorized"
        }

    # if there is an image remove from aws
    if review.image:
        remove_file_from_s3(review.image)

    db.session.delete(review)
    db.session.commit()

    return{
        "message": "review deleted"
    }
