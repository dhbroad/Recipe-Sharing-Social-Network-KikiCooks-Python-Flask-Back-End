import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

//
//
// Base structure of code was copied from SignUp.js
//
//

// when we log the user in, we generate an apitoken in flask that will be returned


export default function Login({ logMeIn }) {
    const [redirect, setRedirect] = useState(false);
    const [message, setMessage] = useState('');
    
    const sendToFlask = async ( e ) => {
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:5000/api/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            })
        });
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            // log them in 
            logMeIn(data.user)
            setRedirect(true)
        }
        else {
            setMessage(data.message)
        }
    };
    
        return redirect?
        (<Navigate to='/' />)
        :
        (
            <div className='border col-12 col-xs-9 col-sm-8 col-lg-4'>
                <h6>{message}</h6>
                <form onSubmit={(e)=>sendToFlask(e)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label> {/* for= from html was changed to htmlFor= to work in JSX */}
                        <input name='username' type="text" className="form-control" id="username" aria-describedby="emailHelp" />
                    </div>     
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name='password' type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    