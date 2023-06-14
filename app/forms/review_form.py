from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class ReviewForm(FlaskForm):
    review = StringField("review", validators=[DataRequired()] )
    rating = IntegerField('rating', validators=[DataRequired()])
    image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
