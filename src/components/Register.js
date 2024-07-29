import axios from 'axios';
import React, { useState } from 'react';

function Register(prop) {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("Register a new account");
    const URL = 'http://localhost:3000/users'


    function handleName(e) {
        setName(e.target.value);
    }

    function handleUserName(e) {
        setUserName(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('user_name', userName);
        formData.append('email', email);
        formData.append('password', password);

        try {


            let response = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage("");
            alert("Registration successful, you can log in now!");
            prop.externalToggle();

        } catch (error) {
            if (error.response.status === 500) {
                setMessage("Email address already exists");
            } else {
                setMessage("Please try again later");
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">


                <form>
                    <h3 className="card-title">{message}</h3>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Name:</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={handleName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">User name:</label>
                        <input type="text" className="form-control" id="userName" value={userName} onChange={handleUserName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} />
                    </div>
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </form>


            </div>
        </div>
    );
}

export default Register;
