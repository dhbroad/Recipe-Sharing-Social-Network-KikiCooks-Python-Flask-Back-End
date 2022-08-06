import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

//
//
// Base structure of code was copied from SignUp.js
//
//

// when we log the user in, we generate an apitoken in flask that will be returned


export default function CreatePost({ user }) {
    const [redirect, setRedirect ] = useState(false)
    const sendToFlask = async ( e ) => {
        e.preventDefault();
        const res = await fetch("https://kikicooks.herokuapp.com/api/create-post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
        },
            body: JSON.stringify({
                title: e.target.title.value,
                img_url: e.target.img_url.value,
                cooktime: e.target.cooktime.value,
                ingredient1: e.target.ingredient1.value,
                ingredient2: e.target.ingredient2.value,
                ingredient3: e.target.ingredient3.value,
                ingredient4: e.target.ingredient4.value,
                ingredient5: e.target.ingredient5.value,
                directions: e.target.directions.value,
                username: user.username,

            })
        });
        
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            setRedirect(true)
            
            
        }
    };
//     const addIngredient = () => {
//     const button = document.getElementById("add_ingredient")

//     const ingredient = document.createElement('div');

//     document.body.insertBefore(ingredient, button)
// }

    return user.token?
    (
        redirect ?
        (
            <Navigate to='/' />
        )
            :
            (
                
        <div className='border col-12 col-xs-9 col-sm-8 col-lg-4' style={{'padding': '10px'}}>
            <h2>Create Your Own Recipe</h2>
            <hr />
                <form onSubmit={(e)=>sendToFlask(e)} id='create_recipe_form'>
                
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label"><h5 style={{'marginBottom': '-15px'}}>Title</h5></label> {/* for= from html was changed to htmlFor= to work in JSX */}
                        <input name='title' type="text" className="form-control" placeholder="Include a short but sweet title"/>
                    </div>   
                    <div className="mb-3">
                        <label htmlFor="img_url" className="form-label"><h5 style={{'marginBottom': '-15px'}}>Image Url</h5></label> 
                        <input name='img_url' type="text" className="form-control" placeholder="Add the URL where the image is hosted"/>
                    </div>   
                    <div className="mb-3">
                        <label htmlFor="cooktime" className="form-label"><h5 style={{'marginBottom': '-15px'}}>Cook Time</h5></label> 
                        <input name='cooktime' type="text" className="form-control" placeholder="Enter the cook time in minutes"/>
                    </div>   
                    <hr style={{'marginTop':'30px'}}/>
                    <div className="mb-3">
                        <label htmlFor="ingredient1" className="form-label"><h5 style={{'marginBottom': '-5px'}}>Ingredients</h5></label> 
                        <input name='ingredient1' type="text" className="form-control" placeholder="Ingredient 1" style={{'marginBottom':'-20px'}}/>
                    </div>   
                    <div className="mb-3" >
                        <label htmlFor="ingredient2" className="form-label" style={{'marginBottom':'-20px'}}></label> 
                        <input name='ingredient2' type="text" className="form-control" placeholder="Ingredient 2" style={{'marginBottom':'-20px'}}/>
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="ingredient3" className="form-label"></label> 
                        <input name='ingredient3' type="text" className="form-control" placeholder="Ingredient 3" style={{'marginBottom':'-20px'}}/>
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="ingredient4" className="form-label"></label> 
                        <input name='ingredient4' type="text" className="form-control" placeholder="Ingredient 4" style={{'marginBottom':'-20px'}}/>
                    </div> 
                    <div className="mb-3">
                        <label htmlFor="ingredient5" className="form-label"></label> 
                        <input name='ingredient5' type="text" className="form-control" placeholder="Ingredient 5"/>
                    </div> 
                    <hr style={{'marginTop':'30px'}}/>
                    <div className="mb-3">
                        <label htmlFor="directions" className="form-label"><h5 style={{'marginBottom': '-5px'}}>Directions</h5></label> 
                        <textarea name='directions' type="text" className="form-control" placeholder="Explain step by step how to cook your recipe" rows='5'/>
                    </div> 

                    <button type="submit" className="create_recipe_submit_btn btn btn-primary" style={{"display":'block', 'width':'200px',"marginLeft":'auto', "marginRight":'40px', 'marginBottom':'10px'}}>Submit Recipe</button>
                    
                    {/* <button name="add_ingredient_button" onClick={addIngredient()} id="add_ingredient" className="btn btn-primary">Add Ingredit</button> */}
                
                    
                </form>
            </div>
    ))
    :
    (
        <Navigate to='login' />
    )
}
    