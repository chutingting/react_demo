import React from 'react'
import { render } from 'react-dom'

//没有引入 react-router
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
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child/>
            </div>
        )
    }
})

render(<App />, document.getElementById('box'));