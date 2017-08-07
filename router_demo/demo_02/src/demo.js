import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,browserHistory } from 'react-router'

const About = React.createClass({
    render(){
        return (
            <div>about page</div>
        )
    }
})

const Inbox = React.createClass({
    render(){
        return (
            <div>Inbox page</div>
        )
    }
})
const Home = React.createClass({
    render(){
        return (
            <div>Home page</div>
        )
    }
})

const App = React.createClass({
    getInitialState() {
        return {
            route: window.location.hash.substr(1)
        }
    },

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    },

    render() {
        let Child
        switch (this.state.route) {
            case '/about': Child = About; break;
            case '/inbox': Child = Inbox; break;
            default:      Child = Home;
        }

        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><link to="/about">About</link></li>
                    <li><link to="/inbox">Inbox</link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})

render((
    <Router>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox} />
        </Route>
    </Router>
), document.getElementById("box"))