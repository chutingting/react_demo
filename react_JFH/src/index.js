var Single = React.createClass({
	clickFun : function(e){
		e.stopPropagation();
		console.log(e.target);
	},
	render : function(){
		return (
			<p onClick={this.clickFun} key={this.key}>{this.props.singleMessage}</p>
		)
	}
});
var List = React.createClass({
	getInitialState : function(){
		return {
			data : {
				0 : "1行",
				1 : "2行",
				2 : "3行",
				3 : "4行"
			}
		}
	},
	componentWillMount : function(){
	
	},
	componentDidMount : function(){
		console.log(this);
		setTimeout(function(){
			this.setState({
				data : {
					0 : "0行",
					1 : "2行",
					2 : "3行",
					3 : "6行"
				}
			},function(){
					console.log("修改");
			});
			console.log('changeDate');
		}.bind(this),3000);
	},
	clickFun : function(e){
		console.log(e.target);
	},
	
	render : function(){
		var html = [];
		for(var i  in this.state.data){
			
			html.push(<Single key={i} singleMessage={this.state.data[i]} />);
			//html.push(<p onClick={this.clickFun} key={i}>{this.state.data[i]}</p>);
		}
		return (
			<div>{html}</div>
		)
	}

});


var react = ReactDOM.render(
	
	<List />,
	document.getElementById("box")
)
