import { autocompleteClasses } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoritePost from '../components/FavoritePost';
import Week from '../components/Week';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Favorites( { user }) {
  // constructor(){
  //     super();
  const [postsState, setPosts] = useState({
    posts: []
  })
  
  const [daysState, setDays] = useState({
    days: []
  })
 

  useEffect(async () => { // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
    const res = await fetch(`https://kikicooks.herokuapp.com/api/show-favorites`, { // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.token
                },
            });
    const data = await res.json();
    console.log(data)

    if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
      const myPosts = data.posts
        setPosts({
            posts: myPosts
        })
    
    }
    
  }, []) 

  useEffect(async () => { // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
    const res = await fetch(`https://kikicooks.herokuapp.com/api/get-days`, {
        method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.token
            },
        });
    const data = await res.json();
    console.log(data)

    if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
      const myDays = data.posts
        setDays({
            days: myDays
        })
    
    }
    
  }, []) 

  const weekdays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

  const addToWeekday = async (apost, day, number) => { // e stands for event
    const res = await fetch("https://kikicooks.herokuapp.com/api/add-meal-to-day", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.token
        },
        body: JSON.stringify({
            title: apost.title,
            img_url: apost.image,
            cooktime: apost.cooktime,
            weekday: day,
            number: number,
        })
    });
    const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            console.log(`Successfully added meal to weekday.`)
        }
  };

    

// render() {
    return postsState.posts == [] ?
    (
    <div class='text-center' style={{position:'relative'}}>
    <h3>You do not have any favorites.</h3>
    <h3> Please create an account or log in </h3>
    <h3>to start saving your favorite recipes!</h3>
    </div>
    )
    :
    (

        <>
        {console.log(postsState.posts)}
        {console.log('false')}
            <div clas='column'>
                {/* <div className='row justify-content-around'>
                    {weekdays.map((w, i) => <Week weekdays={w} key={i}  />)}
                    {daysState.days.map((d, i) => <Week days={d} key={i} />)}
                </div> */}

                <div class='row justify-content-around'>
                    {postsState.posts.map((p, i) => <FavoritePost post={p} key={i} user={user} addToWeekday={addToWeekday}/>)}
                </div>

            </div>
            
                {/* <DragDropContext>
                    <Droppable droppableId="favorite_posts">
                        {(provided) => (
                            <div>
                            <ul className="row" {...provided.droppableProps} ref={provided.innerRef}>
                                {state.posts.map((p, i) => {
                                    return (
                                        <Draggable key={(p.id).toString()} draggableId={p.id} index={i}>
                                            {(provided) => (
                                                <div>
                                                <li {...provided.draggableProps} {...provided.DragHandleProps} ref={provided.innerRef}>
                                                    
                                                    <FavoritePost post={p} user={user} />
                                                </li>
                                                </div>
                                            )}</Draggable>
                                    );
                                })}
                            </ul>
                            </div>
                        )} 
                    </Droppable>
                </DragDropContext> */}
                
        </>
    )
}
    // }
// }