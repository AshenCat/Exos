import React from 'react';
import {Route} from 'react-router-dom'
import Home from './pages/Home';
import Characters from './pages/Characters';

class Content extends React.Component {
    state = {  }

    
    
    render() { 
    return ( 
    <div style={{/*backgroundColor: "blue"*/}}> 
        <Route exact path='/' component={Home} />
        <Route path='/Characters' component={Characters} />
        
    </div> 
     );
    }
}
 
export default Content;