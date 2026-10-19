from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, NumberRange, Length
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired(), Length(max=255)])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    plant_id =IntegerField("plant_id", validators=[DataRequired()])
