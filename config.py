# Config.py is a file to set up the configurations of our app all in one place and then apply them by importing and loading the attributes in __init__.py using from_object() method we get from importing Flask
# 
import os # we have to import the python build in os in order to get things from our .env file

# When you get your app hosted on the internet, your base directory is no longer C:\ etc, so setting this basedir below lets us keep our path the same regardless of where it's hosted
basedir = os.path.abspath(os.path.dirname(__name__)) # __name__ means "this files name".

class Config():
    FLASK_APP = os.environ.get('FLASK_APP') # os.environ.get() gets things from our .env file. Note!!!!: you must pip install python-dotenv in order to read .env files. (or have it installed from your requirements.txt)
    FLASK_ENV = os.environ.get("FLASK_ENV")
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER =  'smtp.gmail.com'
    MAIL_PORT =  587
    MAIL_USE_TLS =  True
    MAIL_USERNAME =  os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD =  os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER =  os.environ.get('MAIL_DEFAULT_SENDER')