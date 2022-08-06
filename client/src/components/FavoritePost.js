// import React, { Component } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Favorite ( { post, addToWeekday }) {
    // render() {
    const [redirect, setRedirect ] = useState(false)
    const p = post // see Article.js for initial notes on props
    

    return p.title === "" ?
    (<></>)
    :
    (
        // HTML (JSX) below was copied from our flask app's ig > templates > posts.html and reformatted for JSX (things like class = are now className= and you have to add / to self closing html tags)
        // {{}} from the (jinja) flask html are changed to {}
        // Style has to be changed to {{}} because it needs to be a dictionary {} and in order to use a dictionary in our html we need to surround the dictionary with another {}
        <>
        <div className="card-body" style={{width: "20rem"}}>
          {/* <FormGroup>
                <FormControlLabel control={<Checkbox p={p} />} label="" />
                </FormGroup> */}
          
            <Link to={`/kikicooks/${p.id}`} className="card text-decoration-none text-dark" style={{ width: '20rem' }} target='_blank'> {/* <a href= was changed to <Link to= and Link has to be imported */}
              <img src={p.image} className="card-img-top" alt={p.title} /> {/* <img> needs to have a closing / in JSX so we added it at the end <img /> */}
                  <div className="card-title">{p.title}</div>

                  <div className="card-text">{p.cooktime}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>
                  </div>

                <p className="card-text">{p.caption}</p>
                <p className="card-text">{p.username}</p>
                </Link> {/* have to add closing Link tag */}
        {/* <div className='Row'>
        <span>Add To: </span>
        <button onClick={()=>addToWeekday(p)}>M</button>
        <button onClick={()=>addToWeekday(p, 'Tue', 2)}>T</button>
        <button onClick={()=>addToWeekday(p, 'Wed', 3)}>W</button>
        <button onClick={()=>addToWeekday(p, 'Thu', 4)}>Th</button>
        <button onClick={()=>addToWeekday(p, 'Fri', 5)}>F</button>
        <button onClick={()=>addToWeekday(p, 'Sat', 6)}>Sa</button>
        <button onClick={()=>addToWeekday(p, 'Sun', 7)}>Su</button>
        </div>  */}
        </div>
        </>
    )
    }