import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect, withRouter } from 'react-redux';

const Login = (props) => {
    console.log(props)

    //put the cookie check/redirect here
    return <div>
        <h1>Login</h1>
        <Link to='home'> Home </Link>
    </div>

}

export default Login