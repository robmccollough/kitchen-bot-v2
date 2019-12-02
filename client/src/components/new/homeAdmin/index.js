import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect, withRouter } from 'react-redux';

const HomeAdmin = (props) => {
    console.log(props)

    //put the cookie check/redirect here
    return <div>
        <h1>HomeAdmin</h1>
        <Link to='/home'>Clink</Link>
    </div>

}

export default HomeAdmin