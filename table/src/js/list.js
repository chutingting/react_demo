
import TableList from './table.js';
import Model from './model.js';
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[]};
    }

    componentDidMount(){
        /*var tmp = this.getData();
        var val = this.changeValue();
        tmp.push(val);
        this.setState({data:tmp});*/
        this.changeValue();
    }


    getData(){
        return [
            {name:"小明",age:12},
            {name:"小花",age:13},
            {name:"小草",age:14},
            {name:"小红",age:15}
        ]
    }

    addBtn(){
        this.refs['__model'].show();
    }

    changeValue(value){
        var tmp = this.getData();
        if(value != undefined && this.state.data.length != 0){
            this.state.data.push(value);
            this.setState({data:this.state.data});
        }else{
            this.setState({data:tmp});
        }
    }

    render(){
        return(
            <div>
                <button className='btn btn-sm btn-info' onClick={this.addBtn.bind(this)}>添加</button>
                <TableList data={this.state.data}/>
                <Model ref='__model' changeValue={this.changeValue.bind(this)} arr={this.state.arr}/>
            </div>
        )
    }
}
ReactDOM.render(<List />,document.getElementById("box"));
