import React from 'react';
import { Link } from 'react-router-dom';


export default function Users ( { users }) {
    return (
            <Link className="text-decoration-none text-reset" to={`/profile/${users.username}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 2 16 16" style={{marginRight:'5px'}} >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                <span className="card-title">{users.username}</span>
            </Link>
            
    )
}
