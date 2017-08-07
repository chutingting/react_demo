
import Util from "../../core/util.jsx";

export default class Tables extends React.Component{
    //构造函数, 创建组件的时候执行
    constructor(props){
        super(props);

        this.getRow = this.getRow.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.action = this.action.bind(this);

        this.state = {data:[]};
        this.cols = [];
        console.log("执行构造函数，初始化变量和转换action作用域, step:1");
    }

    //render之前触发,
    componentWillMount(){
        //不污染数据源
        var data = Util.cloneObj(this.props.data);
        //获取所有列
        this.cols = Util.getProperties(this.props.data);
        this.setState({data:data});
        console.log("state已经准备就绪, step:2");
    }

    //当没有数据影响该组件的时候，不进行重新渲染
    shouldComponentUpdate(nextProps, nextState){
        console.log("true表示需要重新渲染，false不需要重新渲染! 接收到的flag为",nextProps.reRender);
        return nextProps.reRender;
    }

    //dom元素初始化完毕触发,类似document.onLoad
    componentDidMount(){
        console.log("dom已经加载完毕, step:4");
    }

    //单击事件,调用parent的方法
    action(row){
        this.props.rowCallback(row);
    }

    //渲染单行数据, 判断是否是header
    getRow(row,isHeader){
        var html = [];
        if(isHeader){
            this.cols.map(col=>{
                html.push(<td key={Math.random()}>{col}</td>);
            })
            html.push(<td key={Math.random()}>操作</td>);
        }else{
            this.cols.map(col=>{
                html.push(<td key={Math.random()}>{row[col]}</td>);
            })
            html.push(<td key={Math.random()}><a onClick={this.action.bind(this,row)}>详情</a></td>);
        }
        return html;
    }

    //渲染body部分
    renderBody(){
        var html = [];
        this.state.data.map(row=>{
            html.push(<tr key={Math.random()}>{this.getRow(row,false)}</tr>);
        })
        return html;
    }

    render(){
        console.log("Tables组件一切准备就绪,即将开始执行render, step:3");
        if(this.state.data.length == 0){
            return <div></div>
        }else{
            return (
                <table>
                    <thead><tr>{this.getRow(null,true)}</tr></thead>
                    <tbody>{this.renderBody()}</tbody>
                </table>
            )
        }
    }
}