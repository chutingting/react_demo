
import TodoTable from './todoTable.jsx';

export default class TodoList extends React.Component{
    constructor(props){
        super(props);

        this.state = {count:0,data:[]};
    }

    componentDidMount(){
        var tmp = this.getResult();
        this.setState({count:tmp.length,data:tmp});
    }

    getResult(){
        return [
            {date:"2017-7-21",content:"上班"},
            {date:"2017-7-20",content:"逛街"},
            {date:"2017-7-19",content:"看电影"}
        ];
    }

    addItem(){

    }

    render(){
        return (
            <div>
                <div>
                    <span>todo list count is {this.state.count}</span>
                    <span style={{marginLeft:'100px'}}>
                        <input type="button" onClick = {this.addItem.bind(this)} value="Add" />
                    </span>
                </div>
                <TodoTable data={this.state.data} />
            </div>
        )
    }
}