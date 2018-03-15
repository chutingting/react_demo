import React from 'react';

class ToDoItem extends React.Component{
    //删除  数据来源 => ToDoList.jsx ==> ToDoapp.jsx
    delete(){
        this.props.deleteItem(this.props.data.id);
    }
    //完成  数据来源 => ToDoList.jsx ==> ToDoapp.jsx
    complete(){
        this.props.okItem(this.props.data.id);
    }
    render(){
        let {text,time,done,id}=this.props.data;
        return(
            <tr>
                <td>{text}</td>
                <td>{time}</td>
                <td>{done == 0 ? '未完成' : "完成"}</td>
                <td>
                    <a className="btn btn-primary btn-sm" onClick={e=>{this.delete()}}>删除</a>
                    <a className="btn btn-success btn-sm" onClick={e=>{this.complete()}}>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        完成
                    </a>
                </td>
            </tr>
        )
    }
}
export default ToDoItem;