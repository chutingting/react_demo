
import Util from '../../core/util.jsx';

export default class PersonSave extends React.Component{
    constructor(props){
        super(props);
        this.getId = this.getId.bind(this);
        this.flag = "add";
        this.showSaveBtn = "block";
        this.ageData=[{name:"小于20",code:"1"},{name:"等于20",code:"2"},{name:"大于20",code:"3"}];
    }

    componentDidMount(){
        console.log('ready to init');
        console.log("location in props is :",this.props.location);
    }

    getId(){
        console.log("match in props is :", this.props.match);
        return this.props.match.params.id;
    }

    save(){
        var that = this;
        var params = {
            name:this.refs['p_name'].value,
            age:this.refs['p_age'].value,
            add:this.refs['p_add'].value,
            version:this.refs['p_version'].value
        };
        if(this.flag == "edit"){
            params.id = this.getId();
        }
        Util.fetchAjax('../../person.json',"get",params,function(d){
            console.log("save success and flag is ", that.flag);
            that.goList();
        })
    }

    goList(){
        this.props.history.push({pathname:"/person",params:{from:this.flag}});
    }

    appendSelect(data){
        var tmp = [];
        data.map(function(item){
            tmp.push(<option key={Math.random()} value={item.code}>{item.name}</option>);
        })
        return tmp;
    }

    render(){
        console.log('ready to render');
        this.flag = this.props.match.params.tag;
        console.log(this.props.match);
        if(this.flag == "add" || this.flag == "edit"){
            this.showSaveBtn = "block";
        }else{
            this.showSaveBtn = "none";
        }
        var options = this.appendSelect(this.ageData);
        return (
            <div>
                <div>title:person save</div>
                <div>name:<input type="text" ref="p_name" /></div>
                <div>age:<select ref="p_age">{options}</select></div>
                <div>isAdd:<input type="text" ref="p_add" /></div>
                <div>version:<input type="text" ref="p_version" /></div>
                <div>
                    <input style={{display:this.showSaveBtn}} type="button" onClick={this.save.bind(this)} value="保存"/>
                    <input type="button" value="返回上一级" onClick={this.goList.bind(this)} />
                </div>
            </div>
        );
    }
}