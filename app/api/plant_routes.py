from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import Plant, db, User, PlantImage

# we will make this route /api/plants
# the giant plants will be found at /api/plants/giant-plants
# the pet safe plants will be called /api/plants/pet-safe

plant_routes = Blueprint("plants", __name__)

@plant_routes.route('')
def get_all_plants():
    """
    Returns a list of all plants in the database
    """
    plants = Plant.query.all()
    res = {
        "plants": [plant.to_dict() for plant in plants]
    }

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
@plant_routes.route('/<int:id>')
def get_plant_info():
    """
    Returns the information of a specific plant by id
    """

@plant_routes.route('/new', methods=["POST"])
@login_required
def create_plant():
    """
    Create a new plant listing
    """

@plant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_plant():
    """
    Edit a plant
    """

@plant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plant():
    """
    Delete a plant by Id
    """
