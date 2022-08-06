import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom'; // Need to import useParams to use the variable of the route /instagram/:postId <--variable
import '../components/Post.css'



export default function SinglePost({ user, addToFavorites }) {
    const [redirect, setRedirect ] = useState(false)
    const { postId } = useParams() // useParams() gives us back a dictionary with the postId: '#'. Doing { postId } descructures the dictionary and we get back the number at that postId, because we are calling the postId key by it's name, so we get it's value


    const [post, setPost] = useState({}) // Sets the initial state (an empty dictionary). You render the empty dictionary with the return statement that contains your html (JSX), then it mounts with useEffect, which updates our state, so we re-render and show the post we asked for

    useEffect(async ()=>{ // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
        const res = await fetch(`https://kikicooks.herokuapp.com/api/posts/${postId}`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        const data = await res.json();
        console.log(data)
        
        if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
            setPost(data.post)
        }
        else {
            setRedirect(true)
        }
    }, []) // <- our list of dependancies is as an empty list so it will only run once because nothing will ever change in it so we don't have to mount again. Just like in rcc, you only ever mount once
    
    return redirect? // syntax for if statements in JSX -> condition ? (resultIfTrue) : (resultIfFalse)
    (
        <Navigate to='/' />
    )
    :
    (
        
        // Note: all the class= need to be changed to className= when copying from html to JSX
        <> 
        <div className='row'>  
            <div classname='col-xl'>
                <button className='back-button'  onClick={()=> window.close()}><i className='back-button-arrow'></i>Back</button> 
            </div> 
            <div classname='col-xl'>
                <div className="card mb-5" style={{ width: '50rem', marginleft:'20px'}}>
                    <div className="card-header bg-transparent fw-bold">
                            <a className="text-decoration-none text-reset" href={`/profile/${post.username}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 2 16 16" style={{marginRight:'5px'}} >
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                <span className="card-title">{post.username}</span>
                            </a>
                        </div>
                        <img src={post.image} className="card-img-top" alt={post.title} />
                        <div className="card-body">

                        <div card>
                                <div class="row">
                                    <div class="col-md-6">
                                        <h5 className="card-title" style={{display:"inline-block"}}>{post.title}</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <button className='add-to-favorites' style={{float:"right"}} onClick={()=>addToFavorites(post)}>Add To Favorites</button>
                                    </div>
                                </div>
                        </div>

                            <p className="card-text">Cooktime: {post.cooktime} 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                    </svg>
                                </p>   
                            <h5 className="card-title" style={{display:"inline-block"}}>Ingredients</h5>
                            <p className="card-text">{post.ingredient1}</p>
                            <p className="card-text">{post.ingredient2}</p>
                            <p className="card-text">{post.ingredient3}</p>
                            <p className="card-text">{post.ingredient4}</p>
                            <p className="card-text">{post.ingredient5}</p>
                            <p className="card-text">{post.directions}</p>
                    </div>
                </div>
                    {
                        post.user_id === user.id?
                        <>
                        <button color='primary' variant='contained'>Update</button>
                        <button color='error' variant='contained'>Delete</button>
                        </> :
                        null
                    }
            </div>
        </div> 
        </>

    )
}
