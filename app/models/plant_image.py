from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PlantImage(db.Model):
    __tablename__ = "plant_images"

    if environment == "production":
     __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plants.id')), nullable=False)
    image = db.Column(db.String, nullable=False )
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # relationships with

    plants = db.relationship("Plant", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "plant_id": self.plant_id,
            "image": self.image,
            "created_at": self.created_at.strftime('%B %d, %Y')
        }
