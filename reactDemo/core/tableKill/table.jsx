
import Util from "../util.jsx";
import Header from "./header.jsx";
import Body from "./body.jsx";
import Paging from "./paging.jsx";

export default class TK extends React.Component {
	constructor(props) {
		super(props);
		this.state = {arr: [],cols:[],options:{index:1,size:10,total:0,count:0}};
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
		this.checkCols = this.checkCols.bind(this);
		this.bodyCallback = this.bodyCallback.bind(this);
		this.headCallback = this.headCallback.bind(this);

		this.readySendAjax = this.readySendAjax.bind(this);
		this.getData = this.getData.bind(this);

		this.promise = null;
	}

	componentWillMount(){
		console.log("table componentWillMount readySendAjax");
		this.promise = this.readySendAjax();
	}

	componentDidMount(){
		this.getData();
		console.log("table componentDidMount");
	}

	readySendAjax(){
		var that = this;
		var url = this.props.getUrl();
		var pOptions = this.props.pageOption();
		if(url.indexOf('?') == -1){
			url = url + "?";
		}else{
			url = url + "&";
		}
		var tmpUrl = url + pOptions.indexKey+"="+that.state.options.index+"&"+pOptions.sizeKey+"="+that.state.options.size;

		return Util.fetchAjax(tmpUrl,"get",null);
	}

	getData(){
		if(!this.promise){
			this.promise = this.readySendAjax();
		}
		this.promise.then(data=>{
			var res = this.props.analysis(data);
			res.data = Util.dealData(res.data);
			var arr = Util.addId(res.data);
			if(arr && arr.length != 0){
				this.setState({arr:Util.cloneObj(arr),options:{index:this.state.options.index,size:this.state.options.size,total:res.total,count:res.count}});
			}
			//重置
			this.promise = null;
		});
	}

	search(){
		this.state.options.index = 1;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}

	next(){
		this.state.options.index += 1;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}
	prev(){
		this.state.options.index -= 1;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}

	goIndex(index){
		this.state.options.index = index;
		this.refs['__body'].setCkAll(false);
		this.refs['__header'].setCkAllStatus(false);
		this.getData();
	}

	checkCols(data){
		var maps = this.props.map();
		var tmp = data[0];
		var res = {cols:[],errorCols:[]};
		if(!tmp){
			return res;
		}
		for(var i = 0;i<maps.length;i++){
			if(tmp.hasOwnProperty([maps[i].key])){
				res.cols.push(maps[i]);
			}else{
				res.errorCols.push(maps[i]);
			}
		}
		return res;
	}

	bodyCallback(ids){
		this.props.scb(Util.getObjectByIds(ids,this.state.arr));
	}

	headCallback(flag){
		var res = [];
		if(flag){
			res = this.state.arr;
		}
		this.props.scb(res);
	}

	render() {
		console.log("table render function");
		var tmp = this.checkCols(this.state.arr);
		var cols = tmp.cols;
		console.log("*****************tableKill begin work*****************");
		console.log("tableKill error cols is :", tmp.errorCols);
		console.log("tableKill load and current index is ",this.state.options.index);

		var actionArray = [];
		if(this.props.actions){
			actionArray = this.props.actions();
		}
		if(cols != null && cols.length != 0){
			return (
				<div className="table_kill">
					<table className="table table-bordered">
						<Header ref="__header" actions={actionArray} cols={cols} ckcb={this.headCallback} showCk={this.props.showCk} />
						<Body ref="__body" actions={actionArray} data={this.state.arr} cols={cols} ckcb={this.bodyCallback} showCk={this.props.showCk} />
					</table>
					<Paging nextData={this.next} prevData={this.prev} options={this.state.options} goIndex={this.goIndex.bind(this)} />
				</div>
			);
		}else{
			return (
				<div></div>
			);
		}
	}
}