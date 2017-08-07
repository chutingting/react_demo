import React, { Component } from 'react';
import AboutUrl  from './about.js';
import InBoxUrl  from './inbox.js';


class App extends Component {

  ckUrl (url){
      this.setState({name:url})
  }

  constructor (){
    super();

    this.state = {
       name : 'about'
    }
  }
  /*数据加载完毕执行*/
  componentDidMount (){

  }
  render() {

    return (
        <div>
          <ul>
            <li><a href="#/about" onClick = {this.ckUrl.bind(this,'about')}>About</a></li>
            <li><a href="#/inbox" onClick = {this.ckUrl.bind(this,'inbox')}>Inbox</a></li>
          </ul>
          <div>
            {
                this.state.name == 'about' ? <AboutUrl /> : <InBoxUrl />
            }
          </div>
        </div>
    );
  }

}
export default App;
