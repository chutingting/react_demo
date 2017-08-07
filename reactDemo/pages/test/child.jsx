
import Util from "../../core/util.jsx";
export default class OthersInfo extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {entity:this.props.row}
    }

    //属性变化的时候触发
    componentWillReceiveProps(nextProps){
        console.log("child接收到的属性变了，重新渲染!");
        this.state = {entity:nextProps.row};
    }

    renderInfo(){
        var html = [];
        Util.getProperties([this.state.entity]).map(item=>{
            html.push(<div key={Math.random()}>{item}:{this.state.entity[item]}</div>);
        })
        return html;
    }

    render(){
        if(this.state.entity){
            return (
                <div>{this.renderInfo()}</div>
            )
        }else{
            return <div></div>
        }
    }
}