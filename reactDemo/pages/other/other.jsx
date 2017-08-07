
import { Route,Link,NavLink,BrowserRouter,Switch} from 'react-router-dom';
import OthersInfo from "./otherInfo.jsx";


export default class Others extends React.Component{
    constructor(props){
        super(props);
    }

    info(){
        this.props.history.push({pathname:"/Others/info/lv1",params:{id:1}});
    }

    render(match){
        console.log(this.props.match,"---------other");
        return (
            <div>
                <div>
                    <input type="button" value="info" onClick={this.info.bind(this)} />
                </div>
                this is other view outside navigation
                <Route exact path="/Others/info/lv1" component={OthersInfo} />
            </div>
        )
    }
}