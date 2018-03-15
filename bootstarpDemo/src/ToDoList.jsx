import React from 'react';
import ToDoItem from './ToDoItem.jsx';

class ToDoList extends React.Component{

    render(){
        //this.props.data => ToDoapp.jsx
        // this.props.okItem 来自于 ToDoapp.jsx 然后传到 ToDoItem.jsx
        let todos = this.props.data;
        let todoItems = todos.map(item=>{
            return <ToDoItem okItem={this.props.okItem} deleteItem={this.props.deleteItem} key={item.id} data={item}/>;
        });
        return(
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>内容</th>
                        <th>时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                {todoItems}
                </tbody>
            </table>
        )
    }
}
export default ToDoList;