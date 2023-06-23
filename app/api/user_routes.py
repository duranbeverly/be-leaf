from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db, Plant
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/favorites/<int:plant_id>', methods = ['PUT'])
@login_required
def get_favorites(plant_id):
    """
     Returns all favorites by user id
    """

    user = User.query.get(current_user.id)
    plant = Plant.query.get(plant_id)
    plant.plant_favorites.append(user)
    db.session.commit()

    return {'user': user.to_dict()}

@user_routes.route('/favorites/<int:plant_id>', methods=['DELETE'])
@login_required
def delete_fav(plant_id):
    """
    Delete favorite by fav id
    """
    user = User.query.get(current_user.id)
    plant = Plant.query.get(plant_id)
    plant.plant_favorites.remove(user)

    db.session.commit()
    return {'user': user.to_dict()}
