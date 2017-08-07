
export default class Table extends React.Component{

    constructor(props){
        super(props);
        this.state = {data:this.props.data};
        this.getRows = this.getRows.bind(this);
    }
    //当组件传入的 props 发生变化时调用  用于组件 props 变化后，更新state。
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    del(index, e){
        this.setState({
            data: this.state.data.filter((elem, i) => index !== i)
        })
    }

    edit(index,e){
        var _data = this.props.data;
        for(var i=0;i<_data.length;i++){
            if(index == i){
                console.log(_data[i])
            }
        }
    }

    getRows(){
        var html = [];
        this.state.data.map((item,index)=>{
            html.push(<tr key={Math.random()}><td>{item.name}</td><td>{item.age}</td><td><button className='btn btn-sm btn-danger' onClick={this.del.bind(this,index)}>删除</button><button className='btn btn-sm btn-primary' onClick={this.edit.bind(this,index)}>修改</button></td></tr>);
        });
        return html;
    }
    render(){
        var trHtml = this.getRows();
        return (
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>名字</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                     {trHtml}
                </tbody>
            </table>
        )
    }
}
