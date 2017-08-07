
import Tables from "./tables.jsx";
import Child from "./child.jsx";

export default class Parent extends React.Component{

    constructor(props){
        super(props);
        this.rowCb = this.rowCb.bind(this);
        this.state = {data:[],selectedRow:null,reRenderTable:true};
    }

    componentWillMount(){
        this.setState({show:false,data:[
            {name:"aaa",age:"1",sex:"男",address:"北京",friend:"小张"},
            {name:"bbb",age:"2",sex:"女",address:"武汉",friend:"小红"},
            {name:"ccc",age:"3",sex:"中",address:"深圳",friend:"小明"}
        ]});
    }

    rowCb(row){
        this.setState({selectedRow:row,reRenderTable:false});
    }

    render(){
        return (
            <div>
                <Tables data={this.state.data} rowCallback={this.rowCb} reRender={this.state.reRenderTable} />
                <Child row={this.state.selectedRow} />
            </div>
        )
    }
}