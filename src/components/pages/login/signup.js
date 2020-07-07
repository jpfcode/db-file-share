import React from 'react';

export default function SignUp(props) {
   const errorMessages = {
      "none": "",
      "blank field": "Please fill in all fields.",
      "mismatched passwords": "Passwords do not match. Please try again.",
      "fetch error": "An error occured. Please try again later.",
      "username taken": "Username already exists. Please try another one."
   }

   return (
      <form onSubmit={props.handleSubmit}>
         <input
            type="text"
            name="username"
            placeholder="Username"
            value={props.username}
            onChange={props.handleChange} />
         <input
            type="password"
            name="password"
            placeholder="Password"
            value={props.password}
            onChange={props.handleChange}
         />
         <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            value={props.passwordConfirm}
            onChange={props.handleChange}
         />
         <button>Sign Up</button>
         <p className="error">{errorMessages[props.errorMessage]}</p>
      </form>
   );
}