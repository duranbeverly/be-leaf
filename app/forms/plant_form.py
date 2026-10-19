from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SubmitField, BooleanField, SelectMultipleField
from wtforms.validators import DataRequired, Length, NumberRange, Optional, URL
from flask_wtf.file import FileField, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


class PlantForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(max=50)])
    user_id = StringField("user_id", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired(), Length(max=255)])
    price = FloatField("price", validators=[DataRequired()])
    quantity = IntegerField("quantity", validators=[DataRequired(), NumberRange(min=1)])
    preview_image = FileField("preview_image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image_url = StringField("image_url", validators=[Optional(), URL(), Length(max=500)])
    image1 = FileField("image1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField("image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField("image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_giant = BooleanField("is_giant")
    is_pet_friendly = BooleanField("is_pet_friendly")
    submit = SubmitField("submit")
