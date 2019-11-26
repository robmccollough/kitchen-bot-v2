import React from 'react';
import './index.css';
import {Header, Card, Button} from 'semantic-ui-react';


export default class MenuDisplay extends React.Component {  

    constructor(props){    
      super(props);
    }

    render(){

        const {menu_display, refreshHandler} = this.props;
        const {data} = menu_display;
        

        return ( data.food !== null && (
        <Card>
            <Card.Header size='large' content='The Menu'/>
            <Card.Content>
              {Object.keys(data.food).map((key) => {
                let food =  data.food[key]
                return (<div key={key}>
                  <Header size='medium' content={key.charAt(0).toUpperCase() + key.slice(1)}/>
                  <Header size='small' content={`${food.main} | ${food.side} `}/>
                  </div>);
              })}
            </Card.Content>
            <Header size='medium' content={data.date.toISOString()}/>
            <Button content='Refresh' onClick={refreshHandler}/>
          </Card>
        ));
    }
}