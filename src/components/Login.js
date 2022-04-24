import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        const result = JSON.stringify(credentials);
        console.log(result);
        e.preventDefault();
        // const body = result;
        // const headers = {
        //     'Content-Type': 'application/json'
        // }
        // const response = await axios.post('http://localhost:5000/api/auth/login', body, { headers });
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            body: result,
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
