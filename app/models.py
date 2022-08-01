# models.py could be created in every blueprint folder if needed, but if the app isn't extremely large and their aren't a ton of models, it is nice to just have them all in one place.

from email.policy import default
from flask_sqlalchemy import SQLAlchemy # SQLAlchemy will be a version of our database in Python
from datetime import datetime # used to save the date and time in our Post Model
from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from secrets import token_hex

db = SQLAlchemy() # creating a version of our database in python and it's inheriting all of the things from SQLAlchemy

# create our Models based off of our ERD
class User(db.Model, UserMixin): # inheriting from the db.Model class
    id = db.Column(db.Integer, primary_key=True) # id is our primary key and we are making it a column. We are making it an integer. And we are constraining it to being a primary_key
    username = db.Column(db.String(150), nullable=False, unique=True) # nullable=False means the username HAS to exist. And Unique=True so it has to be unique
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(250), nullable=False)
    post = db.relationship('Post', backref='author', lazy=True) # Normally, in SQL, if you are referencing a foreign key in a table, you don’t have to put anything in the origin’s table as well, 
        # but in python we have to also create a relationship/link to the table we are connected to
    cart_item = db.relationship('Cart', backref='cart_user', lazy=True)
    is_admin = db.Column(db.Boolean, default=False)
    apitoken = db.Column(db.String, default=None, nullable=True)

    def __init__(self, username, email, password, is_admin=False): # we initialized our attributes above, but we need a way to create and instance/instantiate for them, so we're using an __init__ method
        self.username = username
        self.email = email
        # self.password = password <-- this would just be storing the actual password for simplicity when building the app, but when finalized, it needs to be encoded as seen below using the built-in function generate_password_hash()
        self.password = generate_password_hash(password)
        self.is_admin=is_admin
        self.apitoken = token_hex(16)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'token': self.apitoken
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, unique=False) # unique=False could be ommitted because it defaults to false
    image = db.Column(db.String(300)) # for now, we will use hyperlinks to host our images instead of hosting them locally in our database
    cooktime = db.Column(db.String(50))
    ingredient1 = db.Column(db.String(300))
    ingredient2 = db.Column(db.String(300))
    ingredient3 = db.Column(db.String(300))
    ingredient4 = db.Column(db.String(300))
    ingredient5 = db.Column(db.String(300))
    directions = db.Column(db.String(1000))
    username = db.Column(db.String(50))
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow()) # datetime.utcnow() grabs the current time on your computer. We also had to import this from datetime
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # nullable=False because the Post HAS to have a user_id attached to it

    def __init__(self, title, image, cooktime, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, directions, username, user_id):
        self.title = title
        self.image = image
        self.cooktime = cooktime
        self.ingredient1 = ingredient1
        self.ingredient2 = ingredient2
        self.ingredient3 = ingredient3
        self.ingredient4 = ingredient4
        self.ingredient5 = ingredient5
        self.directions = directions
        self.username = username
        self.user_id = user_id

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'cooktime': self.cooktime,
            'ingredient1': self.ingredient1,
            'ingredient2': self.ingredient2,
            'ingredient3': self.ingredient3,
            'ingredient4': self.ingredient4,
            'ingredient5': self.ingredient5,
            'directions': self.directions,
            'username': self.username,
            'date_created': self.date_created,
            'user_id': self.user_id
        }

    def to_user_dict(self): {
        'username':self.username
        }


class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, unique=False) # unique=False could be ommitted because it defaults to false
    image = db.Column(db.String(300)) # for now, we will use hyperlinks to host our images instead of hosting them locally in our database
    cooktime = db.Column(db.String(50))
    ingredient1 = db.Column(db.String(300))
    ingredient2 = db.Column(db.String(300))
    ingredient3 = db.Column(db.String(300))
    ingredient4 = db.Column(db.String(300))
    ingredient5 = db.Column(db.String(300))
    directions = db.Column(db.String(1000))
    author = db.Column(db.String(50))
    date_saved = db.Column(db.DateTime, nullable=False, default=datetime.utcnow()) # datetime.utcnow() grabs the current time on your computer. We also had to import this from datetime
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # nullable=False because the Post HAS to have a user_id attached to it

    def __init__(self, title, image, cooktime, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, directions, author, user_id):
        self.title = title
        self.image = image
        self.cooktime = cooktime
        self.ingredient1 = ingredient1
        self.ingredient2 = ingredient2
        self.ingredient3 = ingredient3
        self.ingredient4 = ingredient4
        self.ingredient5 = ingredient5
        self.directions = directions
        self.author = author
        self.user_id = user_id

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'cooktime': self.cooktime,
            'ingredient1': self.ingredient1,
            'ingredient2': self.ingredient2,
            'ingredient3': self.ingredient3,
            'ingredient4': self.ingredient4,
            'ingredient5': self.ingredient5,
            'directions': self.directions,
            'author': self.author,
            'date_saved': self.date_saved,
            'user_id': self.user_id
        }
    

class DayOfMeal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, unique=False) # unique=False could be ommitted because it defaults to false
    image = db.Column(db.String(300)) # for now, we will use hyperlinks to host our images instead of hosting them locally in our database
    cooktime = db.Column(db.String(50))
    weekday = db.Column(db.String(50))
    number = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # nullable=False because the Post HAS to have a user_id attached to it

    def __init__(self, title, image, cooktime, weekday, number, user_id):
        self.title = title
        self.image = image
        self.cooktime = cooktime
        self.weekday = weekday
        self.number = number
        self.user_id = user_id

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'cooktime': self.cooktime,
            'weekday': self.weekday,
            'number': self.number,
            'user_id': self.user_id
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(200), nullable=False, unique=False)
    image = db.Column(db.String(300))
    description = db.Column(db.String(300))
    price = db.Column(db.Float())
    cart_item = db.relationship('Cart', backref='cart_product', lazy=True)

    def __init__(self, product_name, image, description, price):
        self.product_name = product_name
        self.image = image
        self.description = description
        self.price = price

    def to_dict(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "image": self.image,
            "description": self.description,
            "price": self.price
        }

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    def __init__(self, user_id, product_id):
        self.user_id = user_id
        self.product_id = product_id