import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AccountDispatchContext, AccountContext, TripDispatchContext } from '../App';

import { Link } from 'react-router-dom';

function AccessPoint() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountData, setAccountData] = useState([]);
    const [error, setError] = useState("");
    const [isLogIn, setIsLogin] = useState(false);
    const [accessMessage, setAccessMessage] = useState("");
    const URL = 'http://localhost:3000/auth/login';
    const dispatch = useContext(AccountDispatchContext);
    const acount = useContext(AccountContext);




    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            let response = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            dispatch({ type: "token", value: response.data.token });
            dispatch({ type: "exp", value: response.data.exp });
            dispatch({ type: "username", value: response.data.username });


            if (response.data) {
                setAccountData(response.data.data);
                setIsLogin(true);

            } else {
                setError("User not found");
            }
        } catch (error) {
            setError("There is a problem retrieving the data, try again later");
        }
    }



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                {isLogIn ? (
                    <div>

                        <h3>{accessMessage}</h3>
                        <Link to="/Destination" className="btn btn-dark">Go to your trips</Link>


                    </div>
                ) : (
                    <div >

                        <h3 className="card-title">Log In</h3>
                        <h4>{error}</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address:</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} />
                            </div>
                            <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Log in</button>
                        </form>

                    </div>
                )}

            </div>
        </div>
    );
}

export default AccessPoint;