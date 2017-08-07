
import { Link,NavLink,BrowserRouter} from 'react-router-dom';
//import Person from '../person/person.jsx';
//import Books from '../books/books.jsx';
//import PersonSave from "../person/save.jsx";
import Config from "../../router/config.jsx";

let menus = ["Home","Person","Books","todo","parent"];

export default class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var lis = [];
        menus.map(function(item){
            if(item.toLowerCase()== "home"){
                lis.push(<li key={Math.random()}><NavLink to={'/'}>{item.toLowerCase()}</NavLink></li>);
            }else{
                lis.push(<li key={Math.random()}><NavLink activeClassName="green" to={'/'+item.toLowerCase()}>{item.toLowerCase()}</NavLink></li>);
            }
        })

        return (
            <BrowserRouter>
                <div>
                    <ul>
                        {lis}
                    </ul>
                    <Config />
                </div>
            </BrowserRouter>
        )
    }

}