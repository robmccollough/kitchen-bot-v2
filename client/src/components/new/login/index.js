import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect, withRouter } from 'react-redux';
import useForm from 'react-hook-form'
import axios from 'axios';
import sha256 from 'js-sha256';

const Login = (props) => {
    
    const {handleSubmit, register, error} = useForm()
    
    const onSubmit = async (values) => {
       
        console.log(values)
        console.log(process.env)
        return await axios({
            method: 'post',
            url: `http://localhost:${process.env.REACT_APP_SERVER_PORT}/login`,
            data:{
                email: values.email,
                password: values.password
            }
        }).then( r => console.log(r))
    }


    
    return <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" name="email" ref={register({
            required: true
            // , 
            // pattern: /^\S+@\S+$/i
            })} />
        <input type="text" placeholder="Password" name="password" ref={register({required: true})} />
        <input type="submit" />
        </form>

    </div>

}

export default Login