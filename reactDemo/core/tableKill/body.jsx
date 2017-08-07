
/**
 * Created by wupeng5 on 2017/6/12.
 */
import Util from "../util.jsx";
export default class Body extends React.Component{
    constructor(props) {
        super(props);
        this.setCkAll = this.setCkAll.bind(this);
        this.getCkIds = this.getCkIds.bind(this);

        this.state = {data:this.props.data};
    }

    getActionsById(item,row){
        item.action(row);
    }

    componentWillMount(){
        console.log("body componentWillMount");
    }

    componentDidMount(){
        console.log("body componentDidMount");
        var that = this;
        eventPublisher.on("__BodyCkAllOn",function(flag){
            that.setCkAll(flag);
        })
    }

    getSingleRow(row,cols){
        var col = [];
        var showck = this.props.showCk;
        var showActions = false;
        var that = this;
        if(this.props.actions.length != 0){
            showActions = true;
        }
        if(showck){
            col.push(<td className="text-center" key={Math.random()} style={{position: 'relative'}}><input checked={row.ck} type="checkbox" onChange={this.checkOne.bind(this,row)} /></td>);
        }
        if(showActions){
            var tmp = [];
            this.props.actions.map(function(item){
                tmp.push(<a className="btn btn-default btn-xs" key={Math.random()} onClick={that.getActionsById.bind(that,item,row)}>{item.val}</a>);
            })
            col.push(<td key={Math.random()}  className="text-center">{tmp}</td>);
        }
        cols.map(function(field){
            var key = field.key;
            var res = "";
            //处理boolean类型 ， react不渲染 boolean类型,这里需要转换成字符串
            typeof row[key] == "boolean"?res=row[key].toString():res=row[key];
            if(field.convert && field.action ){
                col.push(<td className="text-center" key={Math.random()}><a onClick={that.aAction.bind(that,field,row)}>{field.convert(row[key])}</a></td>);
            }
            else if(field.convert && !field.action){
                col.push(<td className="text-center" key={Math.random()}>{field.convert(row)}</td>);
            }
            else if(!field.convert && field.action){
                col.push(<td className="text-center" key={Math.random()}><a onClick={that.aAction.bind(that,field,row)}>{res}</a></td>);
            }
            else{
                col.push(<td className="text-center" key={Math.random()}>{res}</td>);
            }
        })
        return col;
    }

    aAction(field,row){
        field['action'](row);
    }

    checkCkCount(){
        var num = 0;
        this.state.data.map(item=>{
            if(item.ck){
                num++;
            }
        })
        if(num == this.state.data.length){
            return true;
        }
        return false;
    }

    //react的事件机制：
    //React 为提高性能，有自己的一套事件处理机制，相当于将事件代理到全局进行处理，也就是说监听函数并未绑定到DOM元素上。
    // 因此，如果你禁止react事件冒泡e.stopPropagation()，你就无法阻止原生事件冒泡；
    // 你禁用原生事件冒泡e.nativeEvent.stopPropagation()，React的监听函数就调用不到了。
    checkOne(row,e){
        row.ck = !row.ck;
        this.setState({data:this.state.data});
        var bl = this.checkCkCount();
        eventPublisher.broadcast("__HeaderCkAllOn",bl);
        this.props.ckcb(this.getCkIds());
        //e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
    }

    getCkIds(){
        var res = [];
        this.state.data.map(item=>{
            if(item.ck){
                res.push(item.__tmpId);
            }
        })
        return res;
    }

    setCkAll(flag){
        this.state.data.map(item=>{
            item.ck = flag;
        })
        this.setState({data:this.state.data});
    }

    getRows(cols){
        var that = this;
        var html = [];
        this.state.data.map(function(row){
            html.push(<tr ref={row.__tmpId} key={Math.random()} onClick={that.selectRow.bind(that,row)}>{that.getSingleRow(row,cols)}</tr>);
        })
        return html;
    }

    selectRow(row,e){
        if(e.target.tagName.toLowerCase() == "input" && e.target.getAttribute("type").toLowerCase() == "checkbox"){
            return;
        }
        row.ck = !row.ck;
        this.setState({data:this.state.data});
        var bl = this.checkCkCount();
        eventPublisher.broadcast("__HeaderCkAllOn",bl);
        this.props.ckcb(this.getCkIds());
    }

    render() {
        console.log("body render function");
        var html = this.getRows(this.props.cols);
        return (
            <tbody>
                {html}
            </tbody>
        );
    }
}