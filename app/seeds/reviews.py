from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    for review in [
        {
            "user_id": 1,
            "plant_id": 1,
            "rating": 4,
            "review": "Great plant!",
            "image": "https://be-leaf.s3.amazonaws.com/plant3.jpg"
        },
        {
            "user_id": 2,
            "plant_id": 2,
            "rating": 5,
            "review": "Beautiful plant with vibrant colors.",
            "image": "https://be-leaf.s3.amazonaws.com/plant4.jpg"
        },
        {
            "user_id": 3,
            "plant_id": 3,
            "rating": 3,
            "review": "Average plant, nothing special.",
            "image": "https://be-leaf.s3.amazonaws.com/plant5.jpg"
        }
    ] :
        db.session.add(Review(**review))
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
