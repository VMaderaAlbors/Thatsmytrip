import React from 'react';
import { useState } from 'react';
import AccessPoint from '../components/AccessPoint';
import Register from '../components/Register';

function Login() {
    const [isMember, setIsMember] = useState(true);

    // change isMember variable to the opposite value
    function handleClick(e) {
        e.preventDefault();
        setIsMember(!isMember);
    }

    function externalToggle() {
        setIsMember(true);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header ">
                            <h5 className="mb-3"> </h5>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-2">
                                <button className={`btn btn-lg btn-${isMember ? 'dark' : 'outline-secondary'}`} onClick={handleClick} disabled={isMember}>Log In</button>
                                <button className={`btn btn-lg btn-${!isMember ? 'dark' : 'outline-secondary'}`} onClick={handleClick} disabled={!isMember}>Register</button>
                            </div>

                            <div className="d-grid gap-2">
                                {isMember ? <AccessPoint /> : <Register externalToggle={externalToggle} />}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Login;