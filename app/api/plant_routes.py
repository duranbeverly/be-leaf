from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import Plant, db, User, PlantImage
from app.forms import PlantForm, EditPlantForm
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

# we will make this route prefix /api/plants
# the giant plants will be found at /api/plants/giant-plants
# the pet safe plants will be called /api/plants/pet-safe

plant_routes = Blueprint("plants", __name__)

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
        return "Plant not found"
    res = {"current_plant": plant_info.to_dict()}
    return res


@plant_routes.route('/new', methods=["POST"])
@login_required
def create_plant():
    """
    Create a new plant listing
    """
    print("you got to the backend route!! ")

    form = PlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    # plant_id = None


    if form.validate():
        print("data was validated! =======")
        if "preview_image" in form.data and form.data["preview_image"] != None:
            image = form.data["image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return upload
            else:
                res = Plant (
                    name=form.data["name"],
                    user_id=form.data["user_id"],
                    description=form.data["description"],
                    price=form.data["price"],
                    quantity=form.data["quantity"],
                    preview_image=upload['url'],
                    is_giant=form.data["is_giant"],
                    is_pet_friendly=form.data["is_pet_friendly"]
                )
                plant_id = res.id
                print("res should be the new plant created: ", res.to_dict())
                db.session.add(res)
                db.session.commit()
        # now handle the images and put those in the AWS + database
        all_images = ["preview_image", "image1", "image2", "image3"]

        for image_name in all_images:
            if image_name in form.data and form.data[image_name] is not None:
                curr_image = form.data[image_name]
                curr_image.filename = get_unique_filename(curr_image.filename)
                upload = upload_file_to_s3(curr_image)
                if 'url' not in upload:
                    return upload
                else:
                    res2 = PlantImage(
                        image=upload['url'],
                        plant_id=plant_id
                    )

                db.session.add(res2)
                db.session.commit()
        print("what is res now it should be the plant we made: ", res)
        return {
            "plant": res.to_dict()
            }
    else:
        return form.errors, 401

@plant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_plant(id):
    """
    Edit a plant only if you are its owner
    """

    # check to see if current user is owner of plant
    plant = Plant.query.get(id)

    if current_user.id != plant.user_id:
        return {
            "message": "You can not edit this plant"
        }

    # validate the information by creating a PlantForm
    form = EditPlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        # delete the image on AWS if it exists
        if "preview_image" in form.data and form.data["preview_image"] != None:
            remove_file_from_s3(plant.preview_image)

            image = form.data["preview_image"]
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if 'url' not in upload:
                return upload
            else:
                plant.preview_image = upload["url"]

        plant.name = form.data["name"]
        plant.price = form.data["price"]
        plant.quantity = form.data["quantity"]
        plant.description = form.data["description"]
        plant.is_giant = form.data["is_giant"]
        plant.is_pet_friendly = form.data["is_pet_friendly"]
        db.session.commit()
        return plant.to_dict()
    else:
        return form.errors, 400


@plant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plant(id):
    """
    Delete a plant by Id
    """
    # get the plant by id
    plant = Plant.query.get(id)

    if not plant:
        return {
            "message": "plant not found..."
        }

    # make sure the current user owns the plant
    if current_user.id != plant.user_id:
        return{
            "message": "unauthorized action, you do not own this plant"
        }

    # now remove image from Aws
    remove_file_from_s3(plant.preview_image)

    db.session.delete(plant)
    db.session.commit()

    return {
        "message": "plant deleted"
    }
