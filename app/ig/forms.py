from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

#
#
# SEE AUTH > ROUTES.PY FOR ADDITIONAL NOTES
#
#

class CreatePostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    img_url = StringField('Image URL', validators=[DataRequired()]) # Note that the names of these form variables do not have to be the same name as the models.py, but you should still know what each one goes to
        # when we refer to this variable in the form on the html page, we have to use this variable name, as opposed to the models "image" variable name
    caption = StringField('Caption', validators=[])
    submit = SubmitField()

class UpdatePostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    img_url = StringField('Image URL', validators=[DataRequired()])
    caption = StringField('Caption', validators=[])
    submit = SubmitField()
