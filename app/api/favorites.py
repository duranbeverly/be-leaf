from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import favorite, db
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

favorite_routes = Blueprint("favorites", __name__)

# get all favorites by user id...but then we would have to query for a bunch of stuff...
@favorite_routes.route('')
def get_all_favorites(userId):
    """
    Returns all favorites by user id
    """
pass

# add to favorites
@favorite_routes.route('')
def add_favorite():
    """
    add to favorites
    """
    pass

# delete from favorites
@favorite_routes.route('')
def delete_favorite():
    """
    delete a favorite
    """
    pass
