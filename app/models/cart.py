from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plants.id')), nullable=False)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships with:
    users = db.relationship("User", back_populates='carts')
    plants = db.relationship("Plant", back_populates="carts")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plant_id": self.plant_id,
            "quantity": self.quantity,
            "created_at": self.created_at.strftime('%B %d, %Y')
        }
