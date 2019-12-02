import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Provider, connect, withRouter } from 'react-redux';
import useForm from 'react-hook-form'
import axios from 'axios'


const Register = (props) => {

    const {handleSubmit, register, errors, getValues} = useForm();
    console.log(errors)
    const onSubmit = values => {
        console.log(values)
    }

    //returns true if email is use
    const checkEmail = async (email) => {
        return await axios({
            method: 'post',
            url: 'http://localhost:3000/user/check',
            body:{
                email: email
            }
        }).then( result => {
            return result.in_use
        })
    }


    //put the cookie check/redirect here


    
    return <div>
        <h1>Register</h1>
        <Link to='/home'>Clink</Link>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" name="Email" ref={register({
            required: true, 
            pattern: /^\S+@\S+$/i,
            validate: value => checkEmail(value)
            })} />
            {errors.email && "Email already in use"}
        <input type="text" placeholder="Password" name="Password" ref={register({required: true})} />
        <input type="text" placeholder="Confirm Password" name="Password" ref={register({required: true, validate: value => {
            console.log(getValues())
        }})} />
        <input type="checkbox" placeholder="Link GroupMe Account?" name="Link GroupMe Account?" ref={register} />

        <input type="submit" />
        </form>
    </div>

}

export default Register