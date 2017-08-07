/**
 * Created by wupeng5 on 2017/7/21.
 */

export default class TodoTable extends React.Component{
    constructor(props){
        super(props);

        this.state = {data:this.props.data};
        this.getRows = this.getRows.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data});
    }

    componentDidMount(){

    }

    getRows(){
        var html = [];
        this.state.data.map(item=>{
            html.push(<tr key={Math.random()}><td>{item.date}</td><td>{item.content}</td></tr>);
        })
        return html;
    }

    render(){
        var html = this.getRows();
        if(this.state.data.length == 0){
            return <div></div>;
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        {html}
                    </tbody>
                </table>
            </div>
        )
    }
}