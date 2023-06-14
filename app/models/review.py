from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plants.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships
    users = db.relationship("User", back_populates="reviews")
    plants = db.relationship("Plant", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "plant_id": self.plant_id,
            "rating": self.rating,
            "review": self.review,
            "image": self.image,
            "created_at": self.created_at.strftime('%B %d, %Y')
        }
