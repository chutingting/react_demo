import React from 'react';
import ReactDom from 'react-dom';

var About = React.createClass({

    render:function () {
        return (
            <div>about</div>
        )
    }
});
var Inbox = React.createClass({
    render:function () {
        return(
            <div>inbox</div>
        )
    }
});

var App = React.createClass({
    render:function () {
        return(
            <div>
                <h1>App</h1>

            </div>
        )
    }
})

ReactDom.render(
   <App />
,document.body);

