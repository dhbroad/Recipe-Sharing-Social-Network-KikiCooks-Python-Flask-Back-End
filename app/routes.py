from app import app # need to import app
from flask import render_template, redirect, url_for 
# render_template is a flask function that takes in the name of our html files and renders it as a template 
# We need redirect and url_for to return the route we want to move the user to when we refer to the home route from other files in our flask app

@app.route('/') # route() takes in the path you want to display in the url bar on the website. "/" means the homepage, so for example: if you're on google.com, '/' represents google.com
# calling '/' in other files of our flask app now referes to the url for our home page, which we have defined below as a redirect to ig.posts
def home():
    return redirect(url_for('ig.posts')) # changed our homepage to be ig.posts.html instead of index.html. url_for() returns the url or 'route' of the function you pass in. posts() is a funciton in our ig routes that has the route /posts
    names = ['Shoha', "Dylan", "Christopher", "Alex", "Blair"] 

    # we created the list "names" to demonstrate passing it in as "my_list" in return render_template, so we can access this variable in our html page and do things like use a for loop to dynamically display the data
    return render_template('index.html', my_list=names) # this Would return the render of our index.html page, but because we are already returning the redirect to ig.posts above, this return is never reached



@app.route('/about')
def iCanNameThisAnything(): # This is just a function, so we can name it anything
    return render_template('about.html') # render_template() is a built in function that looks in the templates folder that's on the same level as this routes.py, for the file name you put in as the argument 




@app.route('/api/v2/pokemon/')
def signMeUp():
    
    return {'hi' : "there"} # This is to show that you don't always have to return render_template(), but if you navigate on the website to a route with something in the return section, it will show whatever you put in
    # Being able to send dictionary infomration is important when incorporating your flask app with React 

