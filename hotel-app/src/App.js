import React, { Component } from 'react'
import "./App.css";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import { Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Booknow from './pages/Book';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            userInfo: null,
            username: null,
            historyInfo: [],
            tam: []
        }
    }

    onLogin = (user) => {
        this.setState({ isAuthenticated: true,
                        userInfo: user[0].id_customer,
                        username: user[0].name
                    })
        console.log(this.state.userInfo)
        console.log(user);
        Axios.get('http://localhost:3000/history/' + this.state.userInfo).then(res => {
            this.setState({ historyInfo: res.data })
            console.log(this.state.historyInfo);
            console.log(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    onLoginFail = () => {
        this.setState({ isAuthenticated: false });
        console.log("Login failed");
    }

    onLogOut = () => {
        this.setState({ isAuthenticated: false, userInfo: null, username: null , historyInfo: [] })
    }

    getHistory = () => {
        Axios.get('http://localhost:3000/history/' + this.state.userInfo).then(res => {
            this.setState({ historyInfo: res.data })
            console.log(this.state.historyInfo);
        }).catch(err => {
            console.log(err);
        })
    }

    Delete = (id) => {
        const tempData = this.state.historyInfo.filter(item => item.id_room !== id);
        Axios.delete('http://localhost:3000/book/' + id).then(res => {
            this.setState({ historyInfo: tempData});
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Navbar isAuthenticated={this.state.isAuthenticated} logOut={this.onLogOut}
                        username={this.state.username} />
                <Switch>
                    <Route exact path="/" render={(routeProps) =>
                        <Home
                            {...routeProps}
                        />} />
                    <Route exact path="/Rooms/" component={Rooms} />
                    <Route exact path="/Rooms/:slug" render={(routeProps) =>
                        <SingleRoom
                            isAuthenticated={this.state.isAuthenticated}
                            {...routeProps}
                        />} />
                    <Route exact path="/booknow/:slug" render={(routeProps) =>
                        <Booknow
                            userInfo={this.state.userInfo}
                            getHistory={this.getHistory}
                            isAuthenticated={this.state.isAuthenticated}
                            {...routeProps}
                        />} />
                    <Route exact path="/login" render={(routeProps) =>
                        <Login
                            loginSuccess={this.onLogin}
                            loginFail={this.onLoginFail}
                            redirectPathOnSuccess='/'
                            {...routeProps} />} />
                    <Route exact path="/register" render={(routeProps) =>
                        <Register
                            redirectPathOnSuccess='/login'
                            {...routeProps} />} />
                    <Route exact path="/history" render={(routeProps) =>
                        <History
                            historyInfo={this.state.historyInfo}
                            isAuthenticated={this.state.isAuthenticated}
                            onclickDelete={this.Delete}
                            getdata={this.getHistory}
                            {...routeProps} />} />
                    <Route component={Error} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;