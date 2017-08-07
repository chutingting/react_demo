

//渲染数据
var DataJson = React.createClass({
    handleClick : function(e){
        console.log(e)
    },
    btnClick(d,event){
        event.stopPropagation(); //阻止冒泡
        console.log(d);
        this.refs['__model'].show();

        this.refs['__model'].getData(d);
    },
    render : function(){
        var html = [];
        for(var i=0;i<this.props.data.length;i++){
            var ckOneData = this.props.data[i];
            html.push(<tr key={Math.random()}  onClick={this.handleClick.bind(this,ckOneData)}><td>{this.props.data[i].name}</td><td>{this.props.data[i].age}</td><td>{this.props.data[i].sex}</td><td><button  className='btn btn-info btn-sm' onClick={this.btnClick.bind(this,ckOneData)} >查看</button></td></tr>);
        }
        return(
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>名字</td><td>年龄</td><td>性别</td><td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        {html}
                    </tbody>
                </table>
                <Model ref='__model'></Model>
            </div>
        )
    }
});

//模态框

var Model = React.createClass({
        getInitialState : function(){  //getInitialState 定义初始状态
            return {
                display: 'none',
                name : "",
                age : "",
                sex : ""
            };

        },
        show(){
            this.setState({display : 'block'});
        },
        hidden(){
            this.setState({display : 'none'});
        },
        getData : function(data){ //获取数据
            this.setState({
                name : data.name,
                age : data.age,
                sex : data.sex
            });
        },
        btnSaveCk : function(){
            debugger
            console.log(this.state.name)
        },
        render : function(){
            return (
                <div>
                    <div className="modal" style={{display: this.state.display}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" onClick={this.hidden}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                    <h5 className="modal-title">查看</h5>
                                </div>

                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label" >名字 :</label>
                                            <div className="col-sm-8">
                                                <input type="text" readonly className="form-control input-sm" value={this.state.name}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label" >年龄:</label>
                                            <div className="col-sm-8">
                                                <input type="text" readonly className="form-control input-sm" value={this.state.age}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-3 control-label" >性别:</label>
                                            <div className="col-sm-8">
                                                <input type="text" readonly className="form-control input-sm" value={this.state.sex}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer" style={{clear:'both'}}>
                                        <button type="button" className="btn btn-primary" onClick={this.btnSaveCk}>确定</button>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
            )
        }
});


//请求数据
var  AjaxDemo = React.createClass({
    getInitialState : function(){
        return {
            data : ''
        };
    },
    componentDidMount : function(){
        $.get(this.props.url,function(data){
            var _data = data.datas;
            this.setState({
                data : _data
            })
        }.bind(this))
    } ,
    render : function(){
        return (
            <div>
                <DataJson data={this.state.data}></DataJson>
            </div>
        )
    }
});
ReactDOM.render(
    <AjaxDemo  url="../lib/data.json"/>,
    document.getElementById('demoBox')
);