from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .favorite import favorites

class Plant(db.Model):
    __tablename__ = "plants"

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    is_giant = db.Column(db.Boolean, nullable=False)
    is_pet_friendly = db.Column(db.Boolean, nullable=False)
    preview_image = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships
    users = db.relationship("User", back_populates="plants")
    images = db.relationship("PlantImage", back_populates="plants", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="plants", cascade="all, delete-orphan")
    carts = db.relationship("Cart", back_populates="plants", cascade="all, delete-orphan")
    plant_favorites = db.relationship(
        "User",
        secondary=favorites,
        back_populates="user_favorites",
        cascade="delete, all"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
            "first_name": self.users.first_name,
            "price": self.price,
            "quantity": self.quantity,
            "is_giant": self.is_giant,
            "is_pet_friendly": self.is_pet_friendly,
            "preview_image": self.preview_image,
            "images": [image.to_dict() for image in self.images],
            "created_at": self.created_at.strftime('%B %d, %Y')
        }
