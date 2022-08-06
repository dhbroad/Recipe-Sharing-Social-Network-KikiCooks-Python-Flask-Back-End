from flask import Flask, send_from_directory # Note that the Flask we are importing from has a capital F which means it is a Class
from config import Config # from the config file, we are importing our Config class to apply the attributes we defined to our app using from_object down below in this file
# Note: config.py didn't necessarily need to be a whole separate file. We could have just defined the Class Config() in our __init__.py file, but to keep this file only for things we need in order to initialize the app

# import our blueprints. Every time you create another blueprint/(folder that divides the site how you'd like), you have to import the new blueprint below AND register it using app.register_blueprint(whatever-the-name-of-your-blueprint-is)
from .auth.routes import auth # for the "auth" in import auth, "auth" is what we definied in the auth>route.py as a Blueprint. The same can be said for the rest of these blueprint imports
from .ig.routes import ig


# import our db related
from .models import db, User
from .auth.routes import mail
from flask_migrate import Migrate # Migrate allows us to take in the app and database below
from flask_login import LoginManager

# API CROSS ORIGIN IMPORT
from flask_cors import CORS, cross_origin

app  = Flask(__name__, static_folder='../build', static_url_path='') # instantiating the flask object. We also inherit a lot of methods and attributes through Flask
login = LoginManager() # built in LoginManager we imported from flask_login, that we will connect with our app below using .init_app()
CORS(app)

@login.user_loader
@cross_origin()
def load_user(user_id):
    return User.query.get(user_id)

app.register_blueprint(auth) # when you register your blueprint, your are importing the routes of the argument you pass in
app.register_blueprint(ig)


app.config.from_object(Config) # from_object is one of the built in things we inherited from flask
# This command adds all of the attributes/configurations we designated in our config.py, to our whole app. We have to import config at the top of __init__.py in order to do this


# initialize/connect our database to work with our app
db.init_app(app) # init_app() is a built in function used to connect things to your app
login.init_app(app)
mail.init_app(app)

login.login_view = "auth.logMeIn"

migrate = Migrate(app, db) # Before the built-in Migrate class was created, you would have had to tie your app and db in together manualy using 'Alembic', but now Migrate does all of that for you

from . import routes # from "." means: from "inside this folder", import routes to connect all the files together
from . import models

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')