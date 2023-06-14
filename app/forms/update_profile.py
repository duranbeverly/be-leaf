from flask_wtf import FlaskForm
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import ValidationError
from wtforms import StringField
from app.models import User
from flask_login import current_user


def email_exists(form, field):
    # Checking if email is already in use
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError('email is already in use.')

class UpdateProfile(FlaskForm):
    email = StringField('email', validators=[email_exists])
