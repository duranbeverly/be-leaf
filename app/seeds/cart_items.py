from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cart():
    for cart_item in [
        {
            "user_id": 1,
            "plant_id": 1,
            "quantity": 1,
        },
        {
            "user_id": 2,
            "plant_id": 3,
            "quantity": 1,
        },
        {
            "user_id": 3,
            "plant_id": 2,
            "quantity": 1,
        }
    ] :
        db.session.add(Cart(**cart_item))
    db.session.commit()


def undo_cart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))

    db.session.commit()
