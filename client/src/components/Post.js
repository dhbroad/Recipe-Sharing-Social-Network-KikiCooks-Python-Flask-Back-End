import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Post.css'

export default function Post ( { post, addToFavorites }) {
    // render() {
    const p = post // see Article.js for initial notes on props
    

    return p.title === "" ?
    (<></>)
    :
    (
        // HTML (JSX) below was copied from our flask app's ig > templates > posts.html and reformatted for JSX (things like class= are now className= and you have to add / to self closing html tags)
        // {{}} from the (jinja) flask html are changed to {}
        // Style has to be changed to {{}} because it needs to be a dictionary {} and in order to use a dictionary in our html we need to surround the dictionary with another {}
        <>
        <div className="card pb1" style={{marginBottom:"20px",paddingBottom:"10px",bordercolor:"black !important"}}>
            <div className="card-header bg-transparent fw-bold">
                <Link className="text-decoration-none text-reset" to={`/profile/${p.username}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 2 16 16" style={{marginRight:'5px'}} >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    <span className="card-title">{p.username}</span>
                </Link>
            </div>
            
            <Link to={`/kikicooks/${p.id}`} className="card text-decoration-none text-dark" style={{ width: '35rem' }} target='_blank'> {/* <a href= was changed to <Link to= and Link has to be imported */}
            
                <img src={p.image} className="card-img-top" alt={p.title} /> {/* <img> needs to have a closing / in JSX so we added it at the end <img /> */}
                </Link> {/* have to add closing Link tag */}
                <div card>
                    <div class="row">
                        <div class="col-md-6">
                            <h5 className="card-title" style={{display:"inline-block",marginLeft:"15px", marginTop:"15px"}}>{p.title}</h5>
                        </div>
                        <div class="col-md-6">
                            <button className="mt-3 font-weight-bold add-to-favorites" 
                                 onClick={()=>addToFavorites(p)}>ADD TO FAVORITES</button>
                        </div>
                    </div>
                </div>

                    <p className="card-text" style={{marginLeft:"15px"}}>Cooktime: {p.cooktime} 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                    </p>   
        </div>
        </>
    )
    }
// }
