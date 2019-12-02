import React, { Component } from 'react';
import './index.css';
import  {Header} from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuForm from '../menuForm'
import MenuDisplay from '../menuDisplay';
import{
  menuUploadFormSubmit,
  menuUploadFormChange,
  requestRecentMenu
} from '../../../redux/actions'



class App extends Component {  

  constructor(props){    
    super(props);
    this.handleMenuUploadFormSubmit = this.handleMenuUploadFormSubmit.bind(this);
    this.handleMenuUploadFormChange = this.handleMenuUploadFormChange.bind(this);
    this.handleRequestRecentMenu = this.handleRequestRecentMenu.bind(this);
  }
  
  handleMenuUploadFormSubmit(event){
    
    event.preventDefault();
    event.persist();
    this.props.menuUploadFormSubmit(this.props.menu_form.data)
  }

  handleMenuUploadFormChange(event, {value}){
    event.persist()
    let keys = event.target.id.split('.')
    let day = keys[0]
    let meal = keys[1]
    this.props.menuUploadFormChange({
      day: day,
      meal: meal, 
      value: value   
    })
  }

  handleRequestRecentMenu(){
    this.props.requestRecentMenu()
  }

  render() {
    const { menu_form, 
            menu_display, 
            requestRecentMenu } = this.props
    return (     
        <div className='container'>                  
          <Header>KitchenB0t</Header>
          <MenuForm menu_form={menu_form} onSubmit={this.handleMenuUploadFormSubmit} onChange={this.handleMenuUploadFormChange}/>
          <MenuDisplay menu_display={menu_display} refreshHandler={this.handleRequestRecentMenu}/>
        </div>      
      );  
  }
}


const mapStateToProps = state => {
  return {
    menu_form: state.menu_form,
    menu_display: state.menu_display
  };
};

const mapDispatchToProps = dispatch => ({
  menuUploadFormSubmit: (form_data) => dispatch(menuUploadFormSubmit(form_data)),
  menuUploadFormChange: (form_elt) => dispatch(menuUploadFormChange(form_elt)),
  requestRecentMenu: () => dispatch(requestRecentMenu())
});


export default connect(mapStateToProps,mapDispatchToProps)(App);