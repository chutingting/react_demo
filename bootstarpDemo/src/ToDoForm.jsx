import React from 'react';

class ToDoForm extends React.Component{
    submit(event){
        event.preventDefault();
    }
    //添加 把文本框里的值传到 ToDoapp.jsx 里 ==> addItem
    add(event){
        if(event.type == 'keyup' && event.keyCode != '13'){
            return;
        }
        let txt = this.refs.txt.value;
        if(txt == ""){
            return;
        }
        this.props.addItem(txt);
        this.refs.txt.value = "";
    }
    render(){
        return (
            <form className='form-horizontal' onSubmit={e=>{this.submit(e)}}>
                <div className='form-group'>
                    <div className='col-sm-10'>
                        <input type="text" ref='txt' className='input-sm form-control'onKeyUp={e=>{this.add(e)}} placeholder='请输入内容'/>
                    </div>
                    <div className='col-sm-2'>
                        <button className='btn btn-sm btn-primary' onClick={e=>{this.add(e)}}>添加</button>
                    </div>
                </div>
            </form>
        )
    }
}
export default ToDoForm;