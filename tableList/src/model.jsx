import React from 'react';

export default class Model extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display : 'none',
            editData : ""
        };
    }
    close(){
        this.setState({
            display : 'none'
        })
    }
    getEditData(item){
        this.setState({
            display : 'block',
            editData : item,
            title:item.title
        })
    }
    getTitle (event) {
        this.setState({
            title: event.target.value
        });
    }
    getAlt(event){

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
                                        <input type="text" className="input-sm form-control" value={this.state.title} onChange={this.getTitle.bind(this)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">alt:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="input-sm form-control" value={this.state.editData.alt}  onChange={this.getAlt.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                         </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={e=>{this.close()}}>取消</button>
                            <button type="button" className="btn btn-primary">确定</button>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }

}
