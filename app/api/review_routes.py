from flask import Blueprint, request
from sqlalchemy import or_, and_
from flask_login import current_user, login_required
from app.models import Review
from app.forms import ReviewForm

# we will make this route prefix /api/reviews

review_routes = Blueprint("reviews", __name__)

# first get all reviews


# get reviews by user id

# get a review by review id

# edit a review

# delete a review
