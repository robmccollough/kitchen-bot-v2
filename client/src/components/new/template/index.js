import React, {useState, useEffect} from 'react'
import axios from 'axios'


/*
 To use this component inside another example:

import TemplateComponent from '{path-to-file}/template'

const SomeOtherComponent = (props) => {

    return <div>
        <TemplateComponent [declare props here eg:] message="Hello!"/>
    </div>

    JACKS BRANCH
}

*/
const TemplateComponent = (props) => {
    //hook declarations go here

    return <div>
        <h1>Im a react component! Here is a message: {props.message}</h1>
    </div>
}



export default TemplateComponent;


