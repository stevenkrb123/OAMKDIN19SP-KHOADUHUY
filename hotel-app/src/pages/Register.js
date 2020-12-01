import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default function Register(props) {
    function register(event) {
        event.preventDefault();
        var id_customer = event.target['id'].value;
        var name = event.target['username'].value;
        var email = event.target['email'].value;
        var password = event.target['password'].value;
        axios.get('http://localhost:3000/user').then(res => {
            var nameRes = res.data.find(e => e.name === event.target['username'].value)
            var idRes = res.data.find(e => e.id_customer === event.target['id'].value)
            console.log(idRes);
            if (nameRes || idRes) {
                alert("Exists uername or id")
            }
            else {
                axios.post('http://localhost:3000/user', {
                    name, id_customer, email, password
                })
                    .then((response) => {
                        console.log(response)
                        if (response) {
                            alert("Create Success");
                            props.history.push(props.redirectPathOnSuccess);
                        }
                        else {
                            alert("both must be string, username and password must be more than 6 characters long");
                        }
                    })
            }
        })
    }
    return (
        <div className="form">
            <form onSubmit={register}>
                <ul className="form-container">
                    <li className="title">Create Account</li>
                    <li>
                        <label>Your Name</label>
                        <input type="text" id="username" name="username" placeholder="Your Name..." />
                    </li>
                    <li>
                        <label>ID</label>
                        <input type="text" id="id" name="id" placeholder="Your ID..." />
                    </li>
                    <li>
                        <label>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email..." />
                    </li>
                    <li>
                        <label>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password..." />
                    </li>
                    <li>
                        <button type="submit" className="btn-Signin">Register</button>
                    </li>
                    <li>
                        Already have an account <Link to="/login"> Log In</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}
