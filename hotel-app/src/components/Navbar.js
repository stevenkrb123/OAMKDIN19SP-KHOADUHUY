import React, { Component } from 'react';
import logo from '../images/logo1.png';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }
    handleToggle = () =>{
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="Oulu Hotel" />
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    <ul className={this.state.isOpen? "nav-links show-nav": "nav-links"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Rooms">Rooms</Link>
                        </li>
                        {
                            this.props.isAuthenticated ?
                            <li>
                            <Link to ="/" onClick={this.props.logOut}>LogOut</Link>
                            </li> :
                            <li>
                            <Link to ="/login">Login</Link>
                            </li>
                        }
                        {this.props.isAuthenticated&&<li><Link to ="/history">History</Link></li>}
                    </ul>
                    {this.props.isAuthenticated&&<div className="username">{this.props.username}</div>}
                </div>
                
            </nav>
        );
    }
}
