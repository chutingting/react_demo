
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Model from './model.jsx';


export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            titleNameSearch:""
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
    /*列表*/
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
        this.refs['_model'].getEditData(item,'edit');
    }
    addData(){
        this.refs['_model'].getEditData({},'add');
    }
    /*修改*/
    getEditData(data,tag){
        if(tag == 'edit'){
            var _list = this.state.list;
            for(var i=0;i<_list.length;i++){
                if(_list[i].id == data.id){
                    _list[i] = data;
                }
            }
            this.setState({
                list  : _list
            })
        }else{
            this.state.list.push(data);
            this.setState({
                list  : this.state.list
            })
        }
    }
    /*查询*/
    titleName(event){
         this.setState({
            titleNameSearch : event.target.value
         });
    }
    search(){
        if(this.state.titleNameSearch == ""){
            return;
        }
        var _list = this.state.list;
        var searchList = [];
        for(var i=0;i<_list.length;i++){
            if(_list[i].title == this.state.titleNameSearch){
                searchList.push(_list[i]);
            }
        }

      //  this.state.list = searchList;
        this.setState({
            list  : searchList
        })
    }
    render(){
        var listHtml = this.getList();
        return(
            <div>
                <div className="form-group col-sm-2">
                    <input type="text" className="form-control input-sm"  value={this.state.titleNameSearch} onChange={this.titleName.bind(this)}/>
                </div>
                <button className = 'btn btn-sm btn-info' onClick={e=>{this.search()}}>查询</button>
                <button className = 'btn btn-sm btn-info' onClick={e=>{this.addData()}}>添加</button>
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
                <Model ref='_model' getEditData = {this.getEditData.bind(this)}/>
            </div>
        )
    }
}
ReactDom.render(<List />,document.getElementById("box"));

