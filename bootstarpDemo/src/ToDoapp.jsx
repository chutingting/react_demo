import React from 'react';
import ReactDom from 'react-dom';
import ToDoList from './ToDoList.jsx';
import ToDoForm from './ToDoForm.jsx';

class ToDoapp extends React.Component{

    constructor(porps){
        super(porps);
        this.ids=1;
        this.state={
            todos:[]
        };
    }
    //完成  ToDoItem.jsx
    okItem(id){
        this.state.todos.map(item=>{
            if(item.id == id){
                item.done = 1;
            }
            return item;
        });
        this.setState({
            todos : this.state.todos
        })
    }
    //删除 ToDoItem.jsx
    deleteItem(id){
        let newTodos = this.state.todos.filter((item)=>{
            return !(item.id == id)
        });
        this.setState({
            todos : newTodos
        })
    }
    //添加 ToDoForm.jsx
    addItem(value){
        this.state.todos.unshift({
              id: this.ids++,
            text: value,
            time:(new Date()).toLocaleString(),
            done : 0
        });
        this.setState({
            todos : this.state.todos
        })
    }

    render(){
        return(
            <div className='container'>
                <div className="panel panel-default">
                    <div className="panel-headingbg-danger">
                        <h1 className="text-center ">ToDo<small>你要做什么？</small></h1>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <ToDoForm addItem={e=>{this.addItem(e)}}/>
                        <ToDoList okItem={e=>{this.okItem(e)}} deleteItem={e=>{this.deleteItem(e)}} data={this.state.todos}/>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDom.render(<ToDoapp />,document.getElementById("table"));
