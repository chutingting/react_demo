
import TableList from './table.js';

export default class Model extends React.Component {

    constructor(props){
        super(props);
        this.state = {display:'',name:"",age:""};
    }
    show(){
        this.setState({display : 'block'});
    }

    hidden(){
        this.setState({display : 'none'});
    }

    handleNameData(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleAgeData(e){
        this.setState({
            age: e.target.value
        })
    }

    btnSaveCk(){
        var name = this.state.name;
        var age = this.state.age;
        this.setState({
            arr: {
                name : name,
                age : age
            }
        });

        var that = this;
        window.setTimeout(function(){
            //console.log(that.state.arr);
            if(that.state.arr.name == "" || that.state.arr.age == ""){
                alert("名字 || 年龄不能为空!");
                return;
            }
            this.props.changeValue(that.state.arr);
            this.hidden();
        }.bind(this),0);

    }
    render(){
        return(
            <div>
                <div className="modal" style={{display: this.state.display}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" onClick={this.hidden.bind(this)}><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h5 className="modal-title">查看</h5>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="col-sm-3 control-label" >名字 :</label>
                                    <div className="col-sm-8">
                                        <input type="text"  className="form-control input-sm"  onChange={this.handleNameData.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label" >年龄:</label>
                                    <div className="col-sm-8">
                                        <input type="text"  className="form-control input-sm" onChange={this.handleAgeData.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer" style={{clear:'both'}}>
                                <button type="button" className="btn btn-primary" onClick={this.btnSaveCk.bind(this)}>确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}