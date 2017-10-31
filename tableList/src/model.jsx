import React from 'react';

export default class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : 'none',
            editData : {id:Math.random(),title:"",alt:""},
            _tag : ""
        };
    }
    close(){
        this.setState({
            display : 'none'
        })
    }
    getEditData(item,tag){
        if(tag == 'edit'){
            this.setState({
                display : 'block',
                editData : item,
                _tag : tag
            })
        }else{
            this.setState({
                display : 'block',
                editData : {id:Math.random(),title:"",alt:""},
                _tag : tag
            })
        }
    }
    getInput (d,tag,e) {
        d[tag] = e.target.value;
        this.setState({editData:this.state.editData});

    }
    /*getAlt(event){
        this.setState({
            editData : {
                alt: event.target.value
            }
        });
    }*/
    save(){

        if(this.state.editData.title == "" || this.state.editData.alt == ""){
            alert('title || alt 不可以为空！');
            return;
        }
        this.props.getEditData(this.state.editData,this.state._tag);
        this.close();

    }
    render(){
        return(
            <div className="modal fade in" style={{display:this.state.display}}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={e=>{this.close()}}><span>×</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title">add/edit</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Title:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="input-sm form-control" value={this.state.editData.title} onChange={e=>{this.getInput(this.state.editData,'title',e)}}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">alt:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="input-sm form-control" value={this.state.editData.alt}  onChange={e=>{this.getInput(this.state.editData,'alt',e)}}/>
                                    </div>
                                </div>
                            </div>
                         </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={e=>{this.close()}}>取消</button>
                            <button type="button" className="btn btn-primary" onClick={e=>{this.save()}}>确定</button>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }

}
