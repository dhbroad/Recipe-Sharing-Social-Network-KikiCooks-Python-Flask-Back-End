import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Post from '../components/Post';


// 
// 
// See News.js for line by line comments on working with RCC (React Class Components)
// 
// 


export default class KC extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount = async () => { 
        const res = await fetch(`http://127.0.0.1:5000/api/posts`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        const data = await res.json();
        console.log(data)
        const myPosts = data.posts
        this.setState({
            posts: myPosts
        })
    }

    render() {
        return (
            <div className='justify-content-around'>
                
                {this.state.posts.map((p, i)=><Post key={i} post={p}/>)}
                
            </div>
        )
    }
}
