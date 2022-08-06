import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';


// 
// 
// See News.js for line by line comments on working with RCC (React Class Components)
// 
// 


export default function Home( { user, addToFavorites }) {
  // constructor(){
  //     super();
  const [state, setState] = useState({
    posts: []
  })

  useEffect(async () => { // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
    const res = await fetch(`https://kikicooks.herokuapp.com/api/posts`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
    const data = await res.json();
    console.log(data)

    if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
      const myPosts = data.posts
        setState({
            posts: myPosts
        })
    
    }
    
  }, []) 

  const goToUser = () => {
    
  }


  // const addToFavorites = async (e) => { // e stands for event
  //   const res = await fetch("https://kikicooks.herokuapp.com/api/favorite-post", {
  //       method: "POST",
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': user.token
  //       },
  //       body: JSON.stringify({
  //           title: e.title,
  //           img_url: e.image,
  //           ingredient1: e.ingredient1,
  //           ingredient2: e.ingredient2,
  //           ingredient3: e.ingredient3,
  //           ingredient4: e.ingredient4,
  //           ingredient5: e.ingredient5,
  //           directions: e.directions,
  //           author: e.username,

  //       })
  //   });
  //   const data = await res.json();
  //       console.log(data)
  //       if (data.status === 'ok') {
  //           console.log('Successfully added to favorites.')
            
            
  //       }
  // };
// render() {
return (
  <div className='justify-content-around' >

    {state.posts.map((p, i) => <Post key={i} post={p}  user={user} addToFavorites={addToFavorites} />)} {/* took out this from this.posts.map*/}
  </div>
)
}
    // }
// }