import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './components/header'
import Explanation from './components/explenation'
import Footer from './components/footer'
import Pending from './components/pending'

class App extends Component {
    constructor(props) {
        super(props);

        this.onLibnameChange = this.onLibnameChange.bind(this);
        this.state = {
            width: '100%',
            badgeSrc: "http://arduino-library-badge.gilmaimon.xyz/badge/LibraryName.svg"
        };
    }

    onLibnameChange(event) {
        let newValue = event.target.value;
        let regex = /^http:\/\/arduino-library-badge\.gilmaimon\.xyz\/badge\/(.+)\.svg$/g;
        
        if(regex.test(newValue)) {
            this.setState({
                badgeSrc: newValue
            })
        }
        
    }

//<Input value={this.state.badgeSrc} width={this.state.width} onChange={this.onLibnameChange}></Input>
//<img src={this.state.badgeSrc} />
/*
<body>
                <div class="appHeader">
                    <p class="appTitle">ArduBadge</p>
                </div>
                <div class="contentContainer">
                    <div class="leftItem">aaa</div>
                    <div class="rightItem">bbb</div>
                </div>
            </body>
            */

    render() {
        return (
            <Router>
                <Route path="/:libname/:type" component={libPage} />
            </Router>
        );
    }
}

function libPage({match}) {
    return <LibPage name={match.params.libname}/>;
}

class LibPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            libname: props.name 
        };
    }

    componentDidMount() {
        fetch(`/library/${this.state.libname}`)
            .then(response => response.json())
            .then(json => this.setState(json) );
    }

    render() {
        let libraryExists = this.state.found;
        if(libraryExists === true) {
            return (
                <div>
                    <Header />
                    <Explanation libName={this.state.libname}/>
                    <Footer />
                </div>
            );
        } else if(libraryExists === false) {
            return "dosent";
        } else {
            return (
                <div>
                    <Header />
                    <Pending libName={this.state.libname}/>
                    <Footer />
                </div>
            );
        }
    }
}


export default App;