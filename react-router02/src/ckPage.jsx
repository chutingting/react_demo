import React from 'react';
import {Link,BrowserRouter,Route,Switch} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';



export default class CkPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/home'>Home</Link></li>
                </ul>
                <div>
                    {renderRoutes(this.props.route.routes)}
                </div>
            </div>
        )
    }
}