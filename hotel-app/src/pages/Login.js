import React from 'react';
import Auth from './Auth';
import { Link, Redirect } from 'react-router-dom';

export default function Login(props) {
    function signin(event) {
        event.preventDefault();
        Auth.authenticate(event.target['name'].value, event.target['password'].value)
            .then(result => {
                props.loginSuccess(result.data);
                props.history.push(props.redirectPathOnSuccess);
                console.log(result.data);
            })
            .catch((error) => {
                props.loginFail()
            })
    }
    return (
        <div className="form">
            <form onSubmit={signin}>
                <ul className="form-container">
                    <li className="title">Sign-In</li>
                    <li>
                        <label>User Name</label>
                        <input type="text" id="name" name="name" placeholder="Email..." />
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password..." />
                    </li>
                    <li>
                        <button type="submit" className="btn-Signin">Sign In</button>
                    </li>
                    <li>New to Amazona?</li>
                    <li>
                        <Link to="/register" className="btn-Register">Create Account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}