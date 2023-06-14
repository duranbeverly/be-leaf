from app.models import db, Plant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_plants():
    for plant in [
         {
            "name": "Plant 1",
            "description": "Description of Plant 1",
            "user_id": 1,
            "price": 10.99,
            "quantity": 5,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant.jpg"
        },
        {
            "name": "Plant 2",
            "description": "Description of Plant 2",
            "user_id": 2,
            "price": 15.99,
            "quantity": 3,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant10.jpg"
        },
        {
            "name": "Plant 3",
            "description": "Description of Plant 3",
            "user_id": 3,
            "price": 12.99,
            "quantity": 8,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant11.jpg"
        },
        {
            "name": "Plant 4",
            "description": "Description of Plant 4",
            "user_id": 4,
            "price": 9.99,
            "quantity": 2,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant12.jpg"
        },
        {
            "name": "Plant 5",
            "description": "Description of Plant 5",
            "user_id": 5,
            "price": 14.99,
            "quantity": 4,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant13.jpg"
        },
        {
            "name": "Plant 6",
            "description": "Description of Plant 6",
            "user_id": 6,
            "price": 11.99,
            "quantity": 6,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant14.jpg"
        },
        {
            "name": "Plant 7",
            "description": "Description of Plant 7",
            "user_id": 7,
            "price": 16.99,
            "quantity": 1,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant15.jpg"
        },
        {
            "name": "Plant 8",
            "description": "Description of Plant 8",
            "user_id": 8,
            "price": 13.99,
            "quantity": 3,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant16.jpg"
        },
        {
            "name": "Plant 9",
            "description": "Description of Plant 9",
            "user_id": 4,
            "price": 10.99,
            "quantity": 5,
            "is_giant": False,
            "is_pet_friendly": True,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant17.jpg"
        },
        {
            "name": "Plant 10",
            "description": "Description of Plant 10",
            "user_id": 1,
            "price": 15.99,
            "quantity": 2,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://s3.console.aws.amazon.com/s3/object/be-leaf?region=us-east-1&prefix=plant2.jpg"
        }
    ] :
        db.session.add(Plant(**plant))
    db.session.commit()

def undo_plants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plants"))

    db.session.commit()
