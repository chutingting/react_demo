
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Model from './model.jsx';

export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        $.ajax({
            url:"http://api.douban.com//v2/movie/coming_soon?start=1&count=3",
            type:"get",
            dataType : "jsonp",
            success:function(d){
                var lastGist = d.subjects[0];
                this.setState({
                    list : d.subjects
                })
            }.bind(this)

        });
    }
    getList(){
        var html = [];
        this.state.list.map((item,index)=>{
            html.push(
                <tr key = {Math.random()}>
                    <td>{item.title}</td>
                    <td><a href="{item.alt}">{item.alt}</a></td>
                    <td>
                        <button className='btn btn-sm btn-danger' onClick={e=>{this.del(index)}}>删除</button>
                        <button className='btn btn-sm btn-info' onClick={e=>{this.edit(item,index)}}>修改</button>
                    </td>
                </tr>
            )
        });
        return html;
    }
    del(index){
        this.setState({
            list : this.state.list.filter((elem, i) => index !== i)
        })
    }
    edit(item,index){
        this.refs['_model'].getEditData(item);
    }
    getEditData(){

    }
    render(){
        var listHtml = this.getList();
        return(
            <div>
                <table className = 'table table-bordered'>
                    <thead>
                        <tr>
                            <th>名字</th>
                            <th>链接</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listHtml}
                    </tbody>
                </table>
                <Model ref='_model' getEditData={e=>{this.getEditData}}/>
            </div>
        )
    }
}
ReactDom.render(<List />,document.getElementById("box"));

