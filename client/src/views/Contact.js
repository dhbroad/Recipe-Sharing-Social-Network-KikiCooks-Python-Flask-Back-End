import React, { useState, useEffect } from 'react'; // Don't need to import from Component like when we use rcc, but we do need useState and useEffect hooks to mimic rcc using rfc (react functional components)

const Contact = () => {

    // In order to have multiple variables, we need to set another state
    const [name, setName] = useState('A Site By David Broadwater') //The initial state can also be a function: useState(() => {bodyOfFunctionGoesInHere}) which is helpful if the thing you are returning takes a minute to compute, so it doesn't have to compute it every time it re-renders



    useEffect(()=>{}, []) // For now, we are solely using the useEffect method to mimic our mounting effect from rcc
        // useEffect takes in a function and an array. The function is a callback function and will run anytime something in the array changes
        
        


    return ( // In RFC, we don't have a render() method. What gets rendered is whatever gets returned
        <div>
            
            <h1>{name}</h1> {/* name is just a variable in this case, so we don't have to do this.state.name like in rcc */}
            <div className='column'>
                <h5 style={{display:'inline-block', float:'left'}}><a href='https://www.linkedin.com/in/david-broadwater-75360750/'>Linked In</a></h5>
                <h5 style={{display:'inline-block', float:'right'}}><a href='https://github.com/dhbroad/LeetCode'>GitHub</a></h5>
            </div>
        </div>
    )
};
export default Contact;