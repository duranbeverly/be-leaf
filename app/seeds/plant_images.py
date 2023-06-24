from app.models import db, PlantImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_plant_images():
    for plant_image in [
        {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/fiddle_leaf_detail_image1.jpg"
        },
        {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/fiddle_leaf_image2.jpg"
        },
        {
            "plant_id": 1,
            "image": "https://be-leaf.s3.amazonaws.com/fiddle_leaf_image3.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/monstera_image1.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/monstera_detail_image2.jpg"
        },
        {
            "plant_id": 2,
            "image": "https://be-leaf.s3.amazonaws.com/monstera_image3.jpg"
        },
        {
            "plant_id": 3,
            "image": "https://be-leaf.s3.amazonaws.com/paradise_image1.jpg"
        },
        {
            "plant_id": 3,
            "image": "https://be-leaf.s3.amazonaws.com/paaradise_image2.jpg"
        },
        {
            "plant_id": 4,
            "image": "https://be-leaf.s3.amazonaws.com/rubber_image1.jpg"
        },
        {
            "plant_id": 4,
            "image": "https://be-leaf.s3.amazonaws.com/rubber_image2.jpg"
        },
        {
            "plant_id": 5,
            "image": "https://be-leaf.s3.amazonaws.com/pothos_image1.jpg"
        },
        {
            "plant_id": 6,
            "image": "https://be-leaf.s3.amazonaws.com/snake_image1.jpg"
        },
        {
            "plant_id": 6,
            "image": "https://be-leaf.s3.amazonaws.com/snake_image2.jpg"
        },
        {
            "plant_id": 7,
            "image": "https://be-leaf.s3.amazonaws.com/lily_image1.jpg"
        },
        {
            "plant_id": 7,
            "image": "https://be-leaf.s3.amazonaws.com/lily_image2.jpg"
        },
        {
            "plant_id": 8,
            "image": "https://be-leaf.s3.amazonaws.com/zz_image1.jpg"
        },
        {
            "plant_id": 8,
            "image": "https://be-leaf.s3.amazonaws.com/zz_image2.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/money_image1.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/money_image2.jpg"
        },
        {
            "plant_id": 9,
            "image": "https://be-leaf.s3.amazonaws.com/money_image3.jpg"
        },
        {
            "plant_id": 10,
            "image": "https://be-leaf.s3.amazonaws.com/fern_image1.jpg"
        },
        {
            "plant_id": 10,
            "image": "https://be-leaf.s3.amazonaws.com/fern_image2.jpg"
        },
        {
            "plant_id": 11,
            "image": "https://be-leaf.s3.amazonaws.com/bromeliad_image1.jpg"
        },
        {
            "plant_id": 11,
            "image": "https://be-leaf.s3.amazonaws.com/bromeliad_image2.jpg"
        },
        {
            "plant_id": 12,
            "image": "https://be-leaf.s3.amazonaws.com/palm_image1.jpg"
        },
        {
            "plant_id": 12,
            "image": "https://be-leaf.s3.amazonaws.com/palm_image2.jpg"
        },
        {
            "plant_id": 13,
            "image": "https://be-leaf.s3.amazonaws.com/mmoney_image1.jpg"
        },
        {
            "plant_id": 13,
            "image": "https://be-leaf.s3.amazonaws.com/mmoney_image2.jpg"
        },
        {
            "plant_id": 14,
            "image": "https://be-leaf.s3.amazonaws.com/calathea_image1.jpg"
        },
        {
            "plant_id": 15,
            "image": "https://be-leaf.s3.amazonaws.com/pparlor_image1.jpg"
        },
        {
            "plant_id": 15,
            "image": "https://be-leaf.s3.amazonaws.com/pparlor_image2.jpg"
        }
    ]:
        db.session.add(PlantImage(**plant_image))
    db.session.commit()

def undo_plant_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plant_images"))

    db.session.commit()
