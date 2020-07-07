import React, { Component } from 'react';

import Login from './login';
import SignUp from './signup';

export default class AuthComponent extends Component {
   constructor(props) {
      super(props);

      this.state = {
         authMethod: "login",
         username: "",
         password: "",
         passwordConfirm: "",
         errorMessage: ""
      }

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
   }

   handleClick() {
      this.setState({ authMethod: "signup" })
   }

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         errorMessage: "none"
      })
   }

   handleSignUp(event) {
      event.preventDefault();

      if (this.state.username === "" || this.state.password === "" || this.state.passwordConfirm === "") {
         this.setState({ errorMessage: "blank field" })
      } else if (this.state.password !== this.state.passwordConfirm) {
         this.setState({ errorMessage: "mismatched passwords" })
      } else {
         fetch("http://127.0.0.1:5000/user/create", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
               username: this.state.username,
               password: this.state.password
            })
         })
            .then(response => response.json())
            .then(data => {
               console.log(data)

               if (data === "Username Taken") {
                  this.setState({ errorMessage: "username taken" })
               } else {
                  this.setState({ errorMessage: "none" })
               }
            })
            .catch(error => {
               console.log(error)
               this.setState({ errorMessage: "fetch error" })
            })
      }
   }

   handleLogin(event) {
      event.preventDefault()

      if (this.state.username === "" || this.state.password === "") {
         this.setState({ errorMessage: "blank field" })
      }
      else {
         fetch("http://127.0.0.1:5000/user/verification", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
               username: this.state.username,
               password: this.state.password
            })
         })
            .then(response => response.json())
            .then(data => {
               console.log(data)

               if (data === "User NOT Verified") {
                  this.setState({ errorMessage: "not verified" })
               }
               else {
                  this.setState({ errorMessage: "none" })
               }
            })
            .catch(error => {
               console.log(error)
               this.setState({ errorMessage: "fetch error" })
            })
      }
   }

   render() {
      return (
         <div className="auth-wrapper">
            {this.state.authMethod === "login"
               ? <Login
                  handleChange={this.handleChange}
                  handleSubmit={this.handleLogin}
                  username={this.state.username}
                  password={this.state.password}
                  errorMessage={this.state.errorMessage}
               />
               : <SignUp
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSignUp}
                  username={this.state.username}
                  password={this.state.password}
                  passwordConfirm={this.state.passwordConfirm}
                  errorMessage={this.state.errorMessage}
               />}
            <p onClick={() => this.handleClick()}>Don't have an account? Click here to sign up!</p>
         </div>
      );
   }
}