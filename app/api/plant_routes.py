from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import Plant, db, User, PlantImage
from app.forms import PlantForm, EditPlantForm
from werkzeug.datastructures import FileStorage
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3, uploads_enabled, DEFAULT_PLANT_IMAGE

# we will make this route prefix /api/plants
# the giant plants will be found at /api/plants/giant-plants
# the pet safe plants will be called /api/plants/pet-safe

plant_routes = Blueprint("plants", __name__)


def uploaded_file(form):
    """
    The preview image file from the form, or None when no real file was sent
    """
    image = form.data.get("preview_image")
    return image if isinstance(image, FileStorage) and image.filename else None


@plant_routes.route('/uploads-enabled')
def get_uploads_enabled():
    """
    Tells the forms whether photo uploads (S3) are turned on
    """
    return {"enabled": uploads_enabled()}

@plant_routes.route('')
def get_all_plants():
    """
    Returns a list of all plants in the database
    """
    plants = Plant.query.all()

    res = {"all_plants": {}}

    for plant in plants:
        plant= plant.to_dict()
        id = plant["id"]
        res["all_plants"][id] = plant


    return res

@plant_routes.route('/giant-plants')
def get_giant_plants():
    """
    Returns only the giant plants
    """
    giant_plants = Plant.query.filter(Plant.is_giant == True)
    res = {
        "giant_plants": [plant.to_dict() for plant in giant_plants]
    }
    return res

@plant_routes.route('/pet-safe')
def get_pet_safe_plants():
    """
    Returns all the pet safe plants
    """
    pet_safe_plants = Plant.query.filter(Plant.is_pet_friendly == True)
    res = {
        "pet_safe": [plant.to_dict() for plant in pet_safe_plants]
    }
    return res

@plant_routes.route('/<int:plantId>')
def get_plant_info(plantId):
    """
    Returns the information of a specific plant by id
    """
    plant_info = Plant.query.get(plantId)
    if plant_info is None:
        return {"errors": {"plant": ["Plant not found"]}}, 404
    res = {"current_plant": plant_info.to_dict()}
    return res


@plant_routes.route('/new', methods=["POST"])
@login_required
def create_plant():
    """
    Create a new plant listing
    """

    form = PlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        # use the uploaded photo when uploads are on, otherwise the image URL
        # the user gave us, otherwise a default plant photo
        preview_image = form.data["image_url"] or DEFAULT_PLANT_IMAGE
        image = uploaded_file(form)
        if image and uploads_enabled():
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {"errors": {"image": [upload["errors"]]}}, 400
            preview_image = upload['url']

        res = Plant(
            name=form.data["name"],
            user_id=current_user.id,
            description=form.data["description"],
            price=form.data["price"],
            quantity=form.data["quantity"],
            preview_image=preview_image,
            is_giant=form.data["is_giant"],
            is_pet_friendly=form.data["is_pet_friendly"]
        )
        db.session.add(res)
        db.session.commit()

        return {"current_plant": res.to_dict()}

    else:
        return {"errors": form.errors}, 400

@plant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_plant(id):
    """
    Edit a plant only if you are its owner
    """
    # check to see if current user is owner of plant
    plant = Plant.query.get(id)

    if plant is None:
        return {"errors": {"plant": ["Plant not found"]}}, 404

    if current_user.id != plant.user_id:
        return {"errors": {"plant": ["You can not edit this plant"]}}, 403

    # validate the information by creating a PlantForm
    form = EditPlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        # only replace the photo when a new file was uploaded (and uploads are on)
        # or a new image URL was given
        image = uploaded_file(form)
        if image and uploads_enabled():
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return {"errors": {"image": [upload["errors"]]}}, 400
            remove_file_from_s3(plant.preview_image)
            plant.preview_image = upload["url"]
        elif form.data["image_url"] and form.data["image_url"] != plant.preview_image:
            remove_file_from_s3(plant.preview_image)
            plant.preview_image = form.data["image_url"]

        plant.name = form.data["name"]
        plant.price = form.data["price"]
        plant.quantity = form.data["quantity"]
        plant.description = form.data["description"]
        plant.is_giant = form.data["is_giant"]
        plant.is_pet_friendly = form.data["is_pet_friendly"]
        db.session.commit()

        return {"current_plant": plant.to_dict()}
    else:
        return {"errors": form.errors}, 400


@plant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plant(id):
    """
    Delete a plant by Id
    """
    # get the plant by id
    plant = Plant.query.get(id)

    if not plant:
        return {"errors": {"plant": ["Plant not found"]}}, 404

    # make sure the current user owns the plant
    if current_user.id != plant.user_id:
        return {"errors": {"plant": ["You do not own this plant"]}}, 403

    # now remove image from Aws
    remove_file_from_s3(plant.preview_image)

    db.session.delete(plant)
    db.session.commit()

    return {
        "message": "plant deleted"
    }
