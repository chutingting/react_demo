/**
 * Created by wupeng5 on 2017/6/8.
 */

import { Route,Switch} from 'react-router-dom';
import ConfigData from "./data.jsx";
import Person from '../pages/person/person.jsx';
import Books from '../pages/books/books.jsx';
import PersonSave from "../pages/person/save.jsx";
import Others from "../pages/other/other.jsx";
import TodoList from "../pages/todoList/todoList.jsx";
import NoMatch from "../pages/noMathch/noMatch.jsx";
import Parent from "../pages/test/parent.jsx";

//因为ES6明确规定，Class内部只有静态方法，没有静态属性,所以ES6在类中定义静态属性都是错误的。
export default class Config extends React.Component{
    constructor(props){
        super(props);
    }

    fill(data){
        var html = [];
        data.map((item) =>{
            if(item.isDefault){
                html.push(<Route key={Math.random()} exact path='/' component={item.component} />);
            }else{
                html.push(<Route key={Math.random()} path={item.path} component={item.component} />);
            }
        })
        return html;
    }

    render(){
        return (
            <Switch>
                <Route exact path="/" component={Books} />
                <Route path="/books" component={Books} />
                <Route path="/person" component={Person}/>
                <Route path="/personSave/:tag/:id" component={PersonSave} />
                <Route path="/Others" component={Others} />
                <Route path="/todo" component={TodoList} />
                <Route path="/parent" component={Parent} />
                <Route path="*" component={NoMatch}/>
            </Switch>
        )
    }
}

