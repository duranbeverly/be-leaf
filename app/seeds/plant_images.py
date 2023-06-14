from app.models import db, PlantImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_plant_images():
    for plant_image in [
         {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 3,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 3,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 3,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 4,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 4,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 4,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 5,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 5,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 5,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 6,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 6,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 6,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
             {
            "plant_id": 7,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 7,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 7,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 8,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 8,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 8,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        },
        {
            "plant_id": 10,
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "plant_id": 10,
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "plant_id": 10,
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        }
    ] :
        db.session.add(PlantImage(**plant_image))
    db.session.commit()

def undo_plant_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plant_images"))

    db.session.commit()
