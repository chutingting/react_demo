import React from 'react';
import {Link,NavLink,BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import RouterCtl from './map.jsx';

export default class RouterConfig extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            routerItems : []
        }
        this.routerMapCtl = new RouterCtl();
    }
    componentDidMount(){
        window.setTimeout(()=>{
            this.setState({
                routerItems : [
                    {
                        component: this.routerMapCtl.getComponentsByName("/ckPage"),
                        routes: [
                            {
                                path: "/home",
                                exact: true,
                                component: this.routerMapCtl.getComponentsByName("/home")
                            },
                            {
                                path:"/about",
                                component:this.routerMapCtl.getComponentsByName('/about')
                            }

                        ]
                    }
                ]
            })
        },0)
    }
    render(){
        return(
            <HashRouter>
                {renderRoutes(this.state.routerItems)}
            </HashRouter>
        )
    }
}