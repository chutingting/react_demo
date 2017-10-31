
import React from 'react';
import ReactDOM from 'react-dom';
import TableList from './table.jsx';
import Model from './model.jsx';
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[]};
    }

    componentDidMount(){
        var tmp = this.getData();
        this.setState({data:tmp});
    }

    getData(){
        return [
            {name:"小明q",age:12},
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
    editShowModel(){
        this.refs['__model'].show();
    }
    render(){
        return(
            <div>
                <button className='btn btn-sm btn-info' onClick={this.addBtn.bind(this)}>添加</button>
                <TableList data={this.state.data} editShowModel={e=>{this.editShowModel()}}/>
                <Model ref='__model' changeValue={this.changeValue.bind(this)} arr={this.state.arr}/>
            </div>
        )
    }
}
ReactDOM.render(<List />,document.getElementById("box"));
