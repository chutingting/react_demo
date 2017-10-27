
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap';

export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        $.ajax({
            url:"http://api.douban.com//v2/movie/in_theaters?start=1&count=3",
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
                    <td>{item.alt}</td>
                </tr>
            )
        });
        return html;
    }
    render(){
        var listHtml = this.getList();
        return(
            <table className = 'table'>
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
        )
    }
}
ReactDom.render(<List />,document.getElementById("box"));

