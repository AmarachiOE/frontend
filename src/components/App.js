import React, { Component } from "react";
import { Route, Link, NavLink } from "react-router-dom";

// Components
import LoginPage from "./LoginPage";
import Posts from "./Posts";
import Post from "./Post";
import PostForm from "./PostForm";
import UpdateForm from "./UpdateForm";
import Register from "./Register";
import Users from "./Users";
import PrivateRoute from "./PrivateRoute"; // redirecting to login for now

// Styles
import "../css/index.css";
//import "../styles/App.css";

//Decrypt username
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

class App extends Component {
  // Clears localstorage and logs out user
  logOutHandler = () => {
    localStorage.clear();
    alert("Thanks for visiting! Come back soon!");
    setInterval(() => window.location.reload(), 900);
  };
  render() {
    // Decrypt username to check which navbar to render
    const length = localStorage.length;
    let user = null;
    for (let i = 0; i < length; i++) {
      const key = localStorage.key(i);
      const decryptKey = cryptr.decrypt(key);
      if (decryptKey === "user") {
        const encryptedUser = localStorage.getItem(key);
        user = cryptr.decrypt(encryptedUser);
      }
    }

    return (
      <div className="App">
        {user ? (
          <nav>
            <p className="current-user">Welcome Expat</p>
            <NavLink to="/posts" activeClassName="active-nav">
              Posts
            </NavLink>
            <NavLink to="/post-form" activeClassName="active-nav">
              Post Your Story
            </NavLink>
            <NavLink
              to="/login"
              activeClassName="active-nav"
              onClick={this.logOutHandler}
            >
              Log Out
            </NavLink>
          </nav>
        ) : (
          <div>
            <nav className="home-nav">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </nav>
            <div className="container home-container">
              <h1>Welcome to Expat Journal!</h1>
              <h2>
                If you're a new user, please register.
                <br /> If you've already registered, please login to view posts.
              </h2>
              <div className="home-btn">
                <Link to="/register" className="home-btn">
                  <button className="btn register-btn">Register</button>
                </Link>
                <Link to="/login">
                  <button className="btn login-btn">Login</button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute path="/posts/:id" component={Post} />
        <PrivateRoute path="/post-form" component={PostForm} />
        <PrivateRoute exact path="/user/:id" component={Users} />
        <PrivateRoute path="/update-form" component={UpdateForm} />
      </div>
    );
  }
}

export default App;
