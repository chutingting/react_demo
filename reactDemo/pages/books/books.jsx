
import TK from "../../core/tableKill/table.jsx";
import SearchSelected from "../../core/searchSelected/searchSelected.jsx";
import Others from "../other/other.jsx";

export default class Books extends React.Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.url = this.url.bind(this);
        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.edit = this.edit.bind(this);
        this.del = this.del.bind(this);
        this.actions = this.actions.bind(this);
        this.map = this.map.bind(this);
        this.selectedItems = [];

        this.convertAge = this.convertAge.bind(this);
        this.actionAge = this.actionAge.bind(this);
        this.selectedCallback = this.selectedCallback.bind(this);
        this.cateValues = null;

        this.state = {name:""};
    }

    selectedCallback(selectedValue){
        console.log("cb value is,",selectedValue);
        this.cateValues = selectedValue;
    }

    //非约束性组件： 用户输入A -> input 中显示A
    //约束性组件： 用户输入A -> 触发onChange事件 -> handleChange 中设置 state.name = “A” -> 渲染input使他的value变成A
    //react 会优化这个渲染过程， 推荐使用约束性组件，因为它能更好的控制组件的生命流程
    render(){
        return (
            <div>
                <div>
                    书名:<input type="text" value={this.state.name} onChange={this.inputChange.bind(this)} />
                    类别:<SearchSelected url="/api/cate/getAll" analysis={this.analysisCate} cb={this.selectedCallback}/>
                    <br/>
                    <input type="button" value="查询" onClick={this.search} />
                    <input type="button" value="go other" onClick={this.goOther.bind(this)} />
                </div>
                <TK ref="tableKill" actions={this.actions} showCk={true} scb={this.getSelectedItems} map={this.map} getUrl={this.url} pageOption={this.pageOption} analysis={this.analysis}/>
            </div>
        )
    }

    inputChange(e){
        this.setState({name: e.target.value});
    }

    url(){
        return "/api/book/getList?name="+this.state.name;
    }

    goOther(){
        this.props.history.push({pathname:"/Others"});
    }

    analysisCate(data){
        data = data.data;
        var res = [];
        data.map(item=>{
            item.__selected_code = item.code;
            item.__selected_name = item.name;
            res.push(item);
        })
        return res;
    }

    edit(item){
        console.log("edit ",item);
    }
    del(item){
        console.log("delete ",item);
    }
    detail(item){
        console.log("detail ",item);
    }

    getSelectedItems(items){
        this.selectedItems = items;
    }

    convertAge(val){
        if(parseInt(val) > 20){
            return "more than 20";
        }else{
            return val;
        }
    }

    actionAge(item){
        console.log("td element click event, click item is ", item);
    }

    map(){
        return [
            {key:"id",val:"ID"},
            {key:"name",val:"书名"},
            {key:"price",val:"价格",convert:this.convertAge,action:this.actionAge},
            {key:"app",val:"版本"}
        ];
    }

    pageOption(){
        return {sizeKey:"size",indexKey:"index"};
    }

    actions(){
        return [
            {key:"delete",val:"删除",action:this.del},
            {key:"detail",val:"详情",action:this.detail},
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