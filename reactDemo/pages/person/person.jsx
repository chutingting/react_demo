
import Util from "../../core/util.jsx";
import TK from "../../core/tableKill/table.jsx";
import { Route,Link,NavLink,BrowserRouter,Prompt} from 'react-router-dom';

export default class Person extends React.Component{
    constructor(props){
        super(props);
        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.edit = this.edit.bind(this);
        this.del = this.del.bind(this);
        this.detail = this.detail.bind(this);
        this.actions = this.actions.bind(this);
        this.map = this.map.bind(this);
        this.selectedItems = [];

        this.batchEdit = this.batchEdit.bind(this);

        this.convertAge = this.convertAge.bind(this);
        this.actionAge = this.actionAge.bind(this);

        this.state = {name:"", age:""};
    }
    componentDidMount(){
        //this.props.router.setRouteLeaveHook(this.context.router,this.routerWillLeave);
    }

    changeNameHandle(e){
        this.setState({name: e.target.value});
    }

    changeAgeHandle(e){
        this.setState({age: e.target.value});
    }

    render(){
        console.log("personList match: ",this.props.match.params);
        console.log("personList location: ",this.props.location);
        return (
            <div>
                <div>
                    姓名:<input type="text" value={this.state.name} onChange={this.changeNameHandle.bind(this)} />
                    年龄:<input type="text" value={this.state.age} onChange={this.changeAgeHandle.bind(this)} />
                    <input type="button" value="查询" onClick={this.search.bind(this)} />
                    <input type="button" value="批量修改" onClick={this.batchEdit.bind(this)} />
                    <input type="button" value="添加" onClick={this.add.bind(this)} />
                </div>
                <TK ref="tableKill" actions={this.actions} showCk={true} scb={this.getSelectedItems} map={this.map} getUrl={this.url.bind(this)} pageOption={this.pageOption} analysis={this.analysis}/>
            </div>
        )
    }

    batchEdit(){
        console.log("selected items are:",this.selectedItems);
        if(this.selectedItems.length < 1){
            return;
        }
        var ids = Util.getFieldVals("id",this.selectedItems).join(',');
        this.props.history.push({pathname:"/personSave/batchEdit/"+ids,params:{selectedItems:this.selectedItems}});
    }

    add(){
        this.props.history.push({pathname:"/personSave/add/new"});
    }

    edit(item){
        this.props.history.push({pathname:"/PersonSave/edit/"+item.id,params:{selectedItems:item}});
        console.log("edit ",item);
    }
    del(item){
        console.log("delete ",item);
    }
    detail(item){
        this.props.history.push({pathname:"/PersonSave/detail/"+item.id,params:{selectedItems:item}});
        console.log("detail ",item);
    }

    getSelectedItems(items){
        this.selectedItems = items;
    }

    convertAge(val){
        val = val.toString();
        switch (val){
            case "1":
                return "<20";
                break;
            case "2":
                return "=20";
                break;
            case "3":
                return ">20";
                break;
            default:
                return val;
                break;
        }
    }

    actionAge(item){
        console.log("td element click event, click item is ", item);
    }

    map(){
        return [
            {key:"id",val:"ID"},
            {key:"name",val:"姓名"},
            {key:"age",val:"年龄",convert:this.convertAge,action:this.actionAge},
            {key:"add",val:"地址"},
            {key:"app",val:"app版本"}
        ];
    }

    url(){
        return "/api/user/getList?name="+this.state.name +"&age="+this.state.age;
    }
    pageOption(){
        return {sizeKey:"size",indexKey:"index"};
    }

    actions(){
        return [
            {key:"edit",val:"修改",action:this.edit},
            {key:"delete",val:"删除",action:this.del},
            {key:"detail",val:"详情",action:this.detail}
        ];
    }

    search(){
        this.refs['tableKill'].search();
    }

    analysis(data){
        data = data.data;
        var tmp = {
            data:data.arr,
            count:data.count,
            total:data.total
        };
        return tmp;
    }
}