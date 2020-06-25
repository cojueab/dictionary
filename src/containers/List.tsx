import {Button, ButtonGroup, Card, Collapse, Elevation, H5} from "@blueprintjs/core";
import {Link} from "react-router-dom";

import * as React from 'react';
import {connect} from "react-redux";

import "../App.css";

import {bindActionCreators} from "redux";
import * as pageActions from '../store/actions'


export interface ICardExampleState {
    elevation: Elevation;
    hasMore: boolean;
    interactive: boolean;
    page: number;
    word: any[]
}

class Main extends React.Component<any, any> {
    public state: ICardExampleState = {
        elevation: 2,
        hasMore: true,
        interactive: false,
        page: 1,
        word: this.props.words
    };


    constructor(props: any) {
        super(props);
        window.onscroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                if(this.props.next){
                    this.load(1);
                }
            }
        };
    }

    public handleSort(param: number) {
        const elements = this.props.words
        this.props.pageActions.activeComponent(param, !elements[param].active)
    }

    public handleDelete(param: number) {
        this.props.pageActions.deleteComponent(param)
    }

    public load(page: any) {
        let pp = this.state.page;
        global.console.log(page)
        if (page === 1) {
            pp = pp + 1
        } else {
            if (pp !== 1) {
                pp = pp - 1
            }
        }
        this.setState({page: pp})
        this.props.pageActions.fetchPosts(pp)
    }

    public render() {
        return (

            <div>
                {this.props.words.filter((x: any) => (this.props.filter === '')
                    || x.word.indexOf(this.props.filter) !== -1
                    || x.englishText.indexOf(this.props.filter) !== -1).map((x: any, index: any) => (
                    <Card {...this.state} style={{textAlign: 'center'}} key={index}>
                        <H5>
                            <a href="#">{x.word}</a>
                        </H5>
                        <p>
                            {x.englishText}
                        </p>
                        <ButtonGroup style={{minWidth: 200}}>
                            <Button icon="translate" onClick={this.handleSort.bind(this, index)}>Translate to
                                Rus</Button>
                            <Link to={"/edit/" + x.index.toString()} style={{textDecoration: 'none'}}><Button
                                icon="edit">Edit</Button></Link>
                            <Button icon="delete" onClick={this.handleDelete.bind(this, x.index)}>Delete</Button>
                        </ButtonGroup>
                        <Collapse isOpen={x.active}>
                            <div style={{padding: '15px'}}>{x.russianText}</div>
                        </Collapse>
                    </Card>
                ))}
            </div>

            // <div style={{textAlign: 'center', height: '300px', overflow: 'auto'}}>
            //     <InfiniteScroll
            //         pageStart={0}
            //         loadMore={this.load}
            //         hasMore={this.state.hasMore}
            //         loader={<div className="loader" key={0}>Loading ...</div>}
            //     >
            //         {this.createList()}
            //     </InfiniteScroll>
            //
            // </div>
        );
    }

}

function mapStateToProps(state: any) {
    return {
        hasMore: state.hasMore,
        next: state.next,
        words: state.word,

    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
