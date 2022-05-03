# After you create a form, you can send it into the template that gets rendered in routes.py so that when the user enters information on the webpage, it will be captured as this form and you can save what gets submitted into your database
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField # All of these fields will change how the form fields shows up to the user, like hiding the password, etc.
#StringField is just normal text, PasswordField hides the password while it's being entered, SubmitField for submit buttons, and BooleanField is for things like checkboxes
from wtforms.validators import DataRequired, EqualTo, Email

# your user creation form should be based off the model, ie how it's getting entered into the database
class UserCreationForm(FlaskForm): #The name of the class is what we want to call our form, and the argument being taken in is FlaskForm so that our class inherets everything from the built-in FlaskForm class
    username = StringField('Username', validators=[DataRequired()]) # DataRequired() means the user MUST pass in something
    email = StringField('Email', validators=[Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField() # this will be a submit button

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField()