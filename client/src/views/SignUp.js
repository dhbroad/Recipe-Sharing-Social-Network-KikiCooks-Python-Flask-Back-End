import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';


// 
// 
// See Contact.js and SinglePost.js for additional line by line comments on using RFC (react functional components)
// 
// 


export default function SignUp() {
const [redirect, setRedirect] = useState(false);
const [message, setMessage] = useState('');

const sendToFlask = async ( e ) => { // we add the parameter/variable e (which stands for event) because we will be getting some input from the user down in our JSX form
    e.preventDefault(); // because we are passing in an event, we have to use preventDefault() which prevents the screen from reloading when we get our event
    const res = await fetch("http://127.0.0.1:5000/api/signup", { // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ // You can only send a string over to an object, so we have to use stringify
            username: e.target.username.value,
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value,
        })
    });
    const data = await res.json();
    if (data.status === 'ok') {
        setRedirect(true)
        setMessage(data.message)
        
    }
    else {
        setMessage(data.message)
    }
};

    return redirect? // syntax for if statements in JSX -> condition ? (resultIfTrue) : (resultIfFalse)
    (<Navigate to='/login' />)
    :
    (
        <div className='border col-12 col-xs-9 col-sm-8 col-lg-4'> {/* for Bootsrtaps col class, when the viewport is normal size, the <div> takes up 12, extra small (xs) it takes up 0, small 8, and large 4 */}
            <h6>{message}</h6> {/* This is an invisible <h6> until the message gets rendered */}
            <form onSubmit={(e)=>sendToFlask(e)}> {/* when the user submits the data in this form, we want to run sendToFlask and send the data as e (the event) */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input name='username' type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name='email' type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input name='password1' type="password" className="form-control" id="password1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <input name='password2' type="password" className="form-control" id="password2" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
