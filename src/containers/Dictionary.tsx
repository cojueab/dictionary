import {Elevation} from "@blueprintjs/core";
import {BrowserRouter as Router, Route} from "react-router-dom";
import EditWord from '../components/EditWord'

import {NavbarExample} from '../components/Navbar/Navbar'

import List from './List'


import * as React from 'react';
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import "../App.css";

import * as pageActions from '../store/actions'



export interface ICardExampleState {
    elevation: Elevation;
    interactive: boolean;
    filter: string;
}

class Main extends React.Component<any, any> {
    public state: ICardExampleState = {
        elevation: 2,
        filter: '',
        interactive: false,

    };


    constructor(props: any) {
        super(props);
        this.handler = this.handler.bind(this)
    }

    public componentDidMount(){
        this.props.pageActions.fetchPosts(1);
    }
    public handler(e: any) {
        this.setState({filter: e.target.value})
    }


    public render() {
        const renderEditWord = (props: any) => <EditWord {...props}/>
        const renderElements = (props: any) => <List {...props}  filter={this.state.filter}/>
        const renderCreateWord = (props: any) => <EditWord {...props} save="true"/>
        return (
            <Router>
                <div className="container" style={{margin: "0 auto"}}>
                    <NavbarExample onChange={this.handler}/>
                    <Route exact={true} path="/" render={renderElements}/>
                    <Route path="/edit/:id" render={renderEditWord}/>
                    <Route path="/create" render={renderCreateWord}/>
                </div>

            </Router>
        );
    }

}

function mapDispatchToProps(dispatch: any) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(Main)