from flask.cli import AppGroup
from .users import seed_users, undo_users
from .plants import seed_plants, undo_plants
from .reviews import seed_reviews, undo_reviews
from .plant_images import seed_plant_images, undo_plant_images
from .cart_items import seed_cart, undo_cart

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_cart()
        undo_reviews()
        undo_plant_images()
        undo_plants()
        undo_users()
    seed_users()
    seed_plants()
    seed_plant_images()
    seed_reviews()
    seed_cart()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cart()
    undo_reviews()
    undo_plant_images()
    undo_plants()
    undo_users()
    # Add other undo functions here
