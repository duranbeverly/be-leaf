from flask import Blueprint
from app.models import PlantImage

# prefix is /api/plant-images
plant_images_routes = Blueprint("plant-images", __name__)

# get all the images
@plant_images_routes.route('')
def get_all_images():
    """
    get all the images for all plants
    """
    images = PlantImage.query.all()

    res = {"all_images": {image.id : image.to_dict() for image in images}}
    return res
