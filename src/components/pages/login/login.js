import React from 'react';

export default function Login(props) {
   const errorMessages = {
      "none": "",
      "blank field": "Please fill in all fields.",
      "fetch error": "An error occured. Please try again later.",
      "not verified": "Incorrect username or password"
   }

   return (
      <form onSubmit={props.handleSubmit}>
         <input
            type="text"
            name="username"
            placeholder="Username"
            value={props.username}
            onChange={props.handleChange}
         />
         <input
            type="password"
            name="password"
            placeholder="Password"
            value={props.password}
            onChange={props.handleChange}
         />
         <button>Login</button>
         <p className="error">{errorMessages[props.errorMessage]}</p>
      </form>
   )
}