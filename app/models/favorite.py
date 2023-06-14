from .db import db, environment, SCHEMA, add_prefix_for_prod


favorites = db.Table(
    'favorites',
    db.Model.metadata,
    db.Column('user_id', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('plant_id', db.ForeignKey(add_prefix_for_prod('plants.id')), primary_key=True)
)

if environment == "production":
    favorites.schema = SCHEMA
