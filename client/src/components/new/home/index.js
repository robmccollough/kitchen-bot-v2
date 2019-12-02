import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect, withRouter } from 'react-redux';

const Home = (props) => {

    //put the cookie check/redirect here
    return <div>
        <h1>Home</h1>
        <Link to='/home'>Home</Link>
        <Link to='/home/admin'>Admin</Link>
        <Link to='/register'>Register</Link>
    </div>

}

export default Home