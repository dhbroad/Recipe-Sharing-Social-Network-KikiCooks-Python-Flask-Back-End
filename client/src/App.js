import React, { useState } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './views/About';
import Contact from './views/Contact';
import CreatePost from './views/CreatePost';
import FailedSearch from './views/FailedSearch';
import Favorites from './views/Favorites';
import Home from './views/Home';
import KC from './views/KC';
import Login from './views/Login';
import SearchResults from './views/SearchResults';
import SignUp from './views/SignUp';
import SinglePost from './views/SinglePost';
import UserProfile from './views/UserProfile';

export default function App () { // creating a function called "App" 
  
//   constructor() { <-- No longer need constructor method in a functional component
//     super(); // super() is needed when you are inheriting (extending) from another class. In this case, we are inheriting from "Component", so we need to run super();
    // console.log('MAIN APP: i have constructed')
    // this.state = { <--RFC Note: we are setting the initial state below for each of the variables using useState 
    //   age: 9000,
    //   people: ['andrew', 'david', 'anthony', 'tyler', 'tommy', 'april', 'christopher', 'dylan', 'jamia'],
    //   user: {}
    // }

    const getUserFromLocalStorage = () => {
        const foundUser = localStorage.getItem('vanguard_user')
        if (foundUser) {
            return JSON.parse(foundUser) // doing the parsing conversion that turns the string into the JSON object of key value pairs
        }
        return {}

    }

    const [user, setUser] = useState(()=>getUserFromLocalStorage());

//   } <--This bracket was from the constructor method
  // #
  // # If you want some type of constructor method for your RFC, you could make a const function below to use in place of it
  // #

  // In RFC, you need const in front of all of the functions below because they are no longer methods being defined inside a class, but they are stand alone functions
  const logMeIn = (userObj) => { // we will pass down the function logMeIn as a prop down in the Return in the login path
    setUser(userObj) // for RFC, it changed from this.setState() to setUser and setting the user to the userObj object
    localStorage.setItem('vanguard_user', JSON.stringify(userObj)) // localStorage is a variable that exists right off the bat. setItem is a built in function to set the key and value for the local storage
    // we name the key something that is specific to our application instead of just "user", so we don't unintentionally interact with any other user instances. 
    // the key-value object can only accept the stringify version of the object, so we use JSON.stringify()
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('vanguard_user') // removes the vanguard_user stored variable from local storage if the user signs out
  }



  const addToFavorites = async (e) => { // e stands for event
    const res = await fetch("https://kikicooks-database.herokuapp.com/api/favorite-post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.token
        },
        body: JSON.stringify({
            title: e.title,
            img_url: e.image,
            cooktime: e.cooktime,
            ingredient1: e.ingredient1,
            ingredient2: e.ingredient2,
            ingredient3: e.ingredient3,
            ingredient4: e.ingredient4,
            ingredient5: e.ingredient5,
            directions: e.directions,
            author: e.username,

        })
    });
    const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            console.log('Successfully added to favorites.')
            
            
        }
  };

  // const searchBarQuery = async (e) => { 
  //   const res = await fetch(`https://kikicooks.herokuapp.com/api/search/${e}`, {
  //       method: "GET",
  //       // headers: {
  //       //     'Content-Type': 'application/json',
  //       // },
  //       // body: JSON.stringify({
  //       //     content: e.entry,
  //       // })
  //   });
  //   const data = await res.json();
  //       console.log(data)
  //       if (data.status === 'ok') {
  //           console.log('Search query successful.')
  //           const postResults = data.posts
  //         const userResults = data.users
  //           setState({
  //               posts: postResults,
  //               users: userResults
  //           })
  //       }
            
  //       };

//   componentDidMount() {
//     // console.log("MAIN APP: I have mounted")
//   }
  // #
  // # CONVERTING TO RFC -> ^ component did mount above wouldn't exist, so you could comment it out or delete it ^
  // #





//   render() { // render (or return) some JSX (which is javascripts HTML)
    // #
    // # CONVERTING TO RFC -> remove render() method 
    // #

    // console.log("MAIN APP: I have rendered")
    return (
      <>
      {/* <div className="bg-light" style={{height:'100vh',width:'100vw',zindex:'0',position:'absolute'}}></div> */}
      <div className='container-fluid'>
        <Navbar currentUser={user} logMeOut={logMeOut}/> {/* we are creating an instance and passing through currentUser and logMeOut to Navbar (refered to as props) */}
            {/* Note: when you acces these "props" in your Navbar.js, they will be called using the syntax {this.props.currentUser} or {this.logMeOut} */}
        {/* <h1>Hi, I am {this.state['name']} and my age is {this.state.age}</h1>
        <button onClick={()=>this.happyBirthday()}>Happy Birthday</button> */}
        <div className='container d-flex justify-content-center mt-5 pt-5'> {/* d-flex is a built in Bootstrap class to make your div a flex container. mt-4 stands for margin top 4 */}
          <Routes>
            <Route path='/' element={<Home user={user} addToFavorites={addToFavorites} />} /> {/* for RFC, all of the variables we pass through changed from this.state.variable-name, to just the variable name */}
            <Route path='/about' element={<About />} /> 
            <Route path='/kikicooks' element={<KC />} />
            <Route path='/kikicooks/:postId' element={<SinglePost user={user} addToFavorites={addToFavorites} />} /> {/* to create a route/path that changes you have to use : and then a name */}
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login logMeIn={logMeIn}/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/favorites' element={<Favorites user={user} />} />
            <Route path='/post/create' element = {<CreatePost user={user}/>} />
            <Route path='/profile/:username' element={<UserProfile user={user} addToFavorites={addToFavorites} />}/>
            <Route path='/search/:searchQuery' element={<SearchResults user={user} addToFavorites={addToFavorites} />}/>
            <Route path='/failed-search' element={<FailedSearch />} />
          </Routes>
        </div>
      </div>
      </>
    )
  }
// }