import React,{useState} from "react";
import ReactDOM from "react-dom";
import { Button, TextArea, Form } from 'semantic-ui-react'

import "./styles.css";

const Request = (props) => {
  //hook declarations go here
 
  const [text, handleChange] = useState("");
  const handleSubmit = (value) => {
    console.log(value);
    /*
    const result = await axios({
      method: 'post',
      //url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
      withCredentials: true,
      data: {
        body: props
      },
    });
    */
  }
  
  
  return (<div class = "ui vertically divided grid">
      <div class="row">Enter a request and KitchenBot will consider it in the future</div>
      <Form class="ui form">
        <textArea placeholder="enter your suggestion" value={text} onChange={(event) => handleChange(event.target.value)}/>
      </Form>
      
      
      <button class="ui button" onClick={() => handleSubmit(text)}>Submit</button>
  </div>)
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Request />, rootElement);




