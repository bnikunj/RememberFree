import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cPassword: ""});
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        });
        const json = await response.json()
        console.log(json);
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
    }


    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onChange} id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="name"
            className="form-control"
            onChange={onChange} id="email"
            aria-describedby="emailHelp"
          />
          <div onChange={onChange} id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={onChange} id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cPassword"
            className="form-control"
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
