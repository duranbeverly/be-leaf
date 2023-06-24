from app.models import db, Plant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_plants():
    for plant in [
        {
            "name": "Fiddle Leaf Fig",
            "description": "The Fiddle Leaf Fig is a popular houseplant known for its large, violin-shaped leaves. It adds a touch of elegance and drama to any space.",
            "user_id": 1,
            "price": 25,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/fiddle_leaf_preview.jpg"
        },
        {
            "name": "Monstera",
            "description": "The Monstera Deliciosa, also known as the Swiss Cheese Plant, features large, fenestrated leaves that develop unique holes as they mature. It's a tropical beauty that brings a lush, tropical feel indoors.",
            "user_id": 2,
            "price": 25,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/monstera_preview.jpg"
        },
        {
            "name": "Bird of Paradise",
            "description": "The Bird of Paradise plant is characterized by its large, paddle-shaped leaves and vibrant orange and blue flowers. It creates a stunning focal point in any room.",
            "user_id": 3,
            "price": 35,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/paradise_preview.jpg"
        },
        {
            "name": "Rubber Tree",
            "description": "The Rubber Tree is a popular indoor plant with glossy, dark green leaves. It's a low-maintenance plant that can grow quite tall, making it a striking addition to any space.",
            "user_id": 4,
            "price": 15,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/rubber_preview.jpg"
        },
        {
            "name": "Silver Pothos",
            "description": "The Silver Satin Pothos leaves are otherworldly with a green base and patches of metallic silver that shimmer when reflecting light. It's a versatile and easy-to-grow plant.",
            "user_id": 5,
            "price": 5,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/pothos_preview.jpg"
        },
        {
            "name": "Snake Plant",
            "description": "The Snake Plant is a classic choice known for its long, arching leaves adorned with small plantlets that dangle from the parent plant. It's a great option for beginners.",
            "user_id": 6,
            "price": 25,
            "quantity": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "preview_image": "https://be-leaf.s3.amazonaws.com/snake_preview.jpg"
        },
            {
            "name": "Peace Lily",
            "description": "The Peace Lily is an elegant plant with glossy, dark green leaves and striking white flowers. It's known for its air-purifying qualities and ability to thrive in low light.",
            "quantity": 5,
            "price": 15,
            "is_giant": True,
            "is_pet_friendly": False,
            "user_id": 7,
            "preview_image": "https://be-leaf.s3.amazonaws.com/lily_preview.jpg"
        },
        {
            "name": "ZZ Plant",
            "description": "The ZZ Plant is a hardy, drought-tolerant plant with glossy, dark green leaves. It's a great choice for those who want a low-maintenance plant with a modern look.",
            "quantity": 5,
            "price": 10,
            "is_giant": True,
            "is_pet_friendly": False,
            "user_id": 8,
            "preview_image": "https://be-leaf.s3.amazonaws.com/zz_preview.jpg"
        },
        {
            "name": "Chinese Money Plant",
            "description": "Popular for its use in Feng Shui, the Money Tree is a pet-friendly and air-purifying plant with large star-shaped leaves and a braided trunk to give your home a tropical feel.",
            "quantity": 5,
            "price": 10,
            "is_giant": True,
            "is_pet_friendly": True,
            "user_id": 1,
            "preview_image": "https://be-leaf.s3.amazonaws.com/money_preview.jpg"
        },
        {
            "name": "Blue Fern",
            "description": "The Boston Fern is a lush and feathery plant with delicate fronds. It adds a touch of greenery and elegance to any space.",
            "quantity": 5,
            "price": 10,
            "is_giant": False,
            "is_pet_friendly": True,
            "user_id": 2,
            "preview_image": "https://be-leaf.s3.amazonaws.com/fern_preview.jpg"
        },
         {
            "name": "Bromeliad Guzmania Yellow",
            "description": "The Bromeliad Yellow provides a vibrant splash of color in your home. Keep the center of the plant halfway filled with water and water the soil infrequently. Keep in indirect light and use a mister to boost humidity.",
            "quantity": 5,
            "price": 5,
            "is_giant": False,
            "is_pet_friendly": True,
            "user_id": 3,
            "preview_image": "https://be-leaf.s3.amazonaws.com/bromeliad_preview.jpg"
        },
        {
            "name": "Bamboo Palm (also large)",
            "description": "The Bamboo Palm is a graceful palm tree with feathery, arching fronds. It's a great choice for adding a tropical touch to your indoor space.",
            "quantity": 5,
            "price": 25,
            "is_giant": True,
            "is_pet_friendly": True,
            "user_id": 4,
            "preview_image": "https://be-leaf.s3.amazonaws.com/palm_preview.jpg"
        },
        {
            "name": "Mini Money Tree",
            "description": "The Money Tree is a popular houseplant with braided trunks and lush, green leaves. It's believed to bring good luck and prosperity.",
            "quantity": 5,
            "price": 15,
            "is_giant": False,
            "is_pet_friendly": True,
            "user_id": 5,
            "preview_image": "https://be-leaf.s3.amazonaws.com/mmoney_preview.jpg"
        },
        {
            "name": "Calathea",
            "description": "Calathea plants have stunning foliage with various patterns and colors. They are known for their vibrant leaves that fold up at night.",
            "quantity": 5,
            "price": 10,
            "is_giant": False,
            "is_pet_friendly": True,
            "user_id": 6,
            "preview_image": "https://be-leaf.s3.amazonaws.com/calathea_preview.jpg"
        },
        {
            "name": "Parlor Palm",
            "description": "The Parlor Palm is a compact palm tree with delicate, feather-like fronds. It's a great choice for adding a touch of greenery to small spaces.",
            "quantity": 5,
            "price": 10,
            "is_giant": False,
            "is_pet_friendly": True,
            "user_id": 7,
            "preview_image": "https://be-leaf.s3.amazonaws.com/pparlor_preview.jpg"
        }
    ]:
        db.session.add(Plant(**plant))
    db.session.commit()

def undo_plants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.plants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM plants"))

    db.session.commit()
