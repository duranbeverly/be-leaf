from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorite import favorites

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # relationships
    plants = db.relationship("Plant", back_populates="users")
    reviews = db.relationship("Review", back_populates="users")
    carts = db.relationship("Cart", back_populates="users")
    user_favorites = db.relationship(
        "Plant",
        secondary=favorites,
        back_populates="plant_favorites",
        cascade="delete, all")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.username,
            'last_name': self.last_name,
            'email': self.email,
            'cart': self.cart.to_dict()
        }
