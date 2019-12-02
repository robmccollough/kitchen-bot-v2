import React from 'react';
import './index.css';
import {Form, Header, Card, Label} from 'semantic-ui-react';


export default class MenuForm extends React.Component {  

    constructor(props){    
      super(props);
    }


    render(){
        const {menu_form, onSubmit, onChange} = this.props;
        const {is_loading, is_visible, data } = menu_form;
        return ( 
            <div>
                <Header as='h3' className='form-header' width=''>Upload Menu</Header>
                <Form className='menu-input' onSubmit={onSubmit}>
                    <Form.Input type='date' value={data.date.toISOString().substring(0,10)} onChange={onChange} width='4'/>
                    {Object.keys(data.food).map((key) => {
                    return( <div key={key}>
                    <Header.Subheader content={`${key.charAt(0).toUpperCase() + key.slice(1)}:`}/>
                    <Form.Group inline>
                        <Form.Input type='text' placeholder='Main' value={data.food[key].main} id={`${key}.main`} onChange={onChange}/>
                        <Form.Input type='text' placeholder='Side' value={data.food[key].side} id={`${key}.side`} onChange={onChange}/>
                    </Form.Group>
                    </div>)
                    })}
                    <Form.Button type='submit' content='Submit'/>
                </Form>
            </div>
            );
    }
}


