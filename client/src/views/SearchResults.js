import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Users from '../components/Users';
import Post from '../components/Post';

export default function SearchResults({user, addToFavorites}) {
    
    const [redirect, setRedirect ] = useState(false)
    const { searchQuery } = useParams()
    console.log(searchQuery)


    const [state, setState] = useState({
        posts: [],
        users: []
      })
    
    
      useEffect(async () => { 
        const res = await fetch(`https://kikicooks.herokuapp.com/api/search/${searchQuery}`);
        const data = await res.json();
        console.log(data)
    
        if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
          const postResults = data.posts
          const userResults = data.users
            setState({
                posts: postResults,
                users: userResults
            })
        }
        else {
            setRedirect(true)
        }
        
      }, []) 
  
    return redirect? (
        <Navigate to='/failed-search' />
    )
    :
    (
        <>
        <div className="">
        <div>
        <h1 className='mb-4'>Search Results for: {searchQuery} </h1>
        </div>
        <div className='justify-content-around column mb-2'>
            <h3 className='mb-4'>Users</h3>
            {state.users.map((u, i) => <Users key={i} users={u}  user={user} />)}
        </div>
        <div className='justify-content-around' >
        <h3>Posts</h3>
        {state.posts.map((p, i) => <Post key={i} post={p}  user={user} addToFavorites={addToFavorites} />)}
      </div>
      </div>
      </>
  )
}
