from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


class EditPlantForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(max=50)])
    user_id = StringField("user_id", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    quantity = IntegerField("quantity", validators=[DataRequired(), NumberRange(min=1)])
    preview_image = FileField("preview_image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image1 = FileField("image1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image2 = FileField("image2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    image3 = FileField("image3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_giant = BooleanField("is_giant", validators=[DataRequired()])
    is_pet_friendly = BooleanField("is_pet_friendly", validators=[DataRequired()])
    submit = SubmitField("submit")
