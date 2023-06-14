from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SubmitField, BooleanField, SelectMultipleField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


class PlantForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(max=50)])
    description = StringField("description", validators=[DataRequired()])
    price = FloatField("Price", validators=[DataRequired()])
    quantity = IntegerField("quantity", validators=[DataRequired(), NumberRange(min=1)])
    preview_image = FileField("image1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image1 = FileField("image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField("image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField("image4", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_giant = BooleanField("is_giant", validators=[DataRequired()])
    is_pet_friendly = BooleanField("is_pet_friendly", validators=[DataRequired()])
    submit = SubmitField("submit")
