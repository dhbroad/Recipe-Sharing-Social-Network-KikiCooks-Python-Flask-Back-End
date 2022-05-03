# run.py is the "entry point" to our application
from app import app, db # From the module (folder) "app", we're importing the variable app from inside our __init__ method where we defined app=Flask(__name__) which is the instance of our flask app
from app.models import User, Post, Product

# There are certain files that are not meant to be ran (like modules). If you tried to just run those types of files by themselves, you would get errors. Modules are meant to be imported and used
# Every Python file has certain attributes. The __name__ attribute will return __main__ if you call the __name__ attribute while in that specific python file. However, if you were in another file and called the __name__ attribute of this file, it would return the name run
if __name__ == "__main__": # __main__ will be returned as the name of __name__ if this is the current file that I'm running. So if run is tried to be used in another file, it would run
    app.run() # run() is a built in function

@app.shell_context_processor
def shell_context():
    return {'db':db, 'User':User, 'Post':Post, 'Product':Product}