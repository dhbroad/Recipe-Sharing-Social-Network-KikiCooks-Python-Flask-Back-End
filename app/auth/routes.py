from flask import Blueprint, render_template, redirect, request, url_for, flash

# import forms and models
from .forms import LoginForm, UserCreationForm # "." means "from the same folder as this file"
from app.models import User

from werkzeug.security import check_password_hash # This is needed in order to check what the user has entered against the store hash passwords in our database
from flask_login import login_user, logout_user, login_required, current_user

# import automated mail dependecies
from flask_mail import Message, Mail
mail = Mail()

auth = Blueprint('auth', __name__, template_folder='auth_templates')

from app.models import db # you have to import the db (database) from models to post information to it

@auth.route('/login', methods=["GET", "POST"]) # By default, @auth.route() allows GET, but to allow POST methods, it has to be stated in methods=[]
def logMeIn():
    form = LoginForm() # creating a variable 'form' that is equal to the LoginForm() class we created in auth > forms.py and imported into this file, routes.py
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    # If the user is submitting the form, they are POSTing information, so we will run everything below this if statement, otherwise, it skips this whole if and just returns the render_template()
    if request.method == "POST":
        if form.validate(): # if all of the validation criteria we set in forms.py is met when the user submits the data, we'll save the submitted data to the variables below
            username = form.username.data # each .attribute after form are from the form we created in auth>forms.py and .data gets back what was submitted when the user filled out the form
            password = form.password.data
            remember_me = form.remember_me.data

            # check if user exists
            user = User.query.filter_by(username=username).first()

            if user:
                if check_password_hash(user.password, password): # check_password_hash was imported above. Checks the 'password' that the user enters against the 'user.password' which is the hash version in our database
                    login_user(user, remember=remember_me) 
                    flash(f'Welcome back, {username}!', 'success') # flash is a built in method we imported to show a message on the screen to the user. We also added get get_flashed_messages() in base.html so it can show up on any html page
                    return redirect(url_for('home'))
                else:
                    flash(f'Incorrect password. Please try again.', 'danger') 
            else:
                flash(f'No valid user with that username. Please try again.', 'danger')
            return redirect(url_for('auth.logMeIn'))
    return render_template('login.html', form = form) # the first "form" in this instance is the render_template parameter, and we are assigning it the value of our form variable we just created as form=LoginForm() right under def LogMeIn()

@auth.route('/signup', methods=["GET", "POST"])
def signMeUp():
    form = UserCreationForm()
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method == "POST":
        if form.validate(): # if all of the validation criteria we set in forms.py is met when the user submits the data, we'll save the submitted data to the variables below
            username = form.username.data
            email = form.email.data
            password = form.password.data

            # check if user exists
            user = User.query.filter_by(username=username).first()
            if user:
                flash(f'That username already exists. Please pick another name', 'danger')
                return redirect(url_for('auth.signMeUp'))
            # create an instance of our user based on the data we saved to the variables above
            user = User(username, email, password)

            # add instance to database
            db.session.add(user)
            # commit to databse
            db.session.commit()

            msg = Message(
                f"Welcome to Shoha's Bike Shop!",
                body= 'Thank you for joining our mailing list. We sell only the biest bikes. Stay tuned for more deals and fire cops.',
                recipients=[email]
            )

            mail.send(msg)




            flash(f'You have successfully created a new user. Welcome, {username}!', 'success')
            return redirect(url_for('auth.logMeIn'))
        else:
            for key in form.errors:
                if key == 'email':
                    flash(form.errors[key][0], 'danger')
                elif key == 'confirm_password':
                    flash("Your passwords did not match. Please try again", 'danger')
    return render_template('signup.html', form=form) # the first "form" in this instance is the render_template parameter, and we are assigning it the value of our form variable we assigned form=UserCreationForm() right under def SignMeUp()

@auth.route('/logout')
@login_required
def logMeOut():
    logout_user() # logout_user() is a built in function we imported from flask_login
    return redirect(url_for('auth.logMeIn'))





# 
# 
#  API ROUTES
# 
# 
@auth.route('/api/signup', methods=["POST"])
def apiSignMeUp():
    data = request.json  
        
    username = data['username']
    email = data['email']
    password1 = data['password1']
    password2 = data['password2']

    if password1 != password2:
        return {
            'status': 'not ok',
            'message': 'The passwords do not match. Try again.'
        }

    # check if user exists
    user = User.query.filter_by(username=username).first()
    if user:
        return {
            'status': 'not ok',
            'message': 'A user with that username already exists. Tough.'
        }
    # create an instance of our user
    user = User(username, email, password1)

    # add instance to database
    db.session.add(user)
    # commit to databse
    db.session.commit()

    msg = Message(
        f"Welcome to Shoha's Bike Shop!",
        body= 'Thank you for joining our mailing list. We sell only the biest bikes. Stay tuned for more deals and fire cops.',
        recipients=[email]
    )

    mail.send(msg)

    return {
        'status': 'ok',
        'message': f"Successfully created an account for {username}.",
        'user': user.to_dict()
    }



@auth.route('/api/login', methods=["POST"])
def apiLogMeIn():
    data = request.json
    
        
    username = data['username']
    password = data['password']

    # check if user exists
    user = User.query.filter_by(username=username).first()

    if user:
        if check_password_hash(user.password, password):
            return {
                'status': 'ok',
                'message': f"Welcome back, {username}",
                'user': user.to_dict()
            }
        else:
            return {
                'status': 'not ok',
                'message': "Invalid password."
            }
    else:
        return {
            'status': "not ok",
            'message': "A user with that username does not exist."
        }

