import {Button, Card, EditableText} from "@blueprintjs/core";

import * as React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import "../App.css";

import * as pageActions from '../store/actions'


export interface ICardExampleState {
    element: any,
    update: boolean[],
    save: boolean
}

class Main extends React.Component<any, any> {
    public state: ICardExampleState = {
        element: this.props.words.filter((x:any) => x.index.toString()===this.props.match.params.id)[0] || {
            active: false,
            englishText: '',
            russianText: '',
            word: '',
        },
        save: this.props.save || 0,
        update: [false, false, false],

    };


    constructor(props: any) {
        super(props);
        this.createItem = this.createItem.bind(this)
        this.updateItem = this.updateItem.bind(this)

    }


    public handleReportChange(type: string, report: any) {
        const element = this.state.element
        switch (type) {
            case 'word':
                element.word = report;
                break;
            case 'englishText':
                element.englishText = report
                break;
            case 'russianText':
                element.russianText = report
                break;
        }
        this.setState({element})
    }

    public createItem() {
        this.props.pageActions.createComponent(this.state.element)
        this.props.history.goBack()
    }

    public updateItem() {
        this.props.pageActions.changeComponent(this.state.element, this.props.match.params.id)
        this.props.history.goBack()
    }


    public updateCurrent(index: any) {
        const update = this.state.update
        update[index] = !update[index]
        this.setState({update})
    }

    public onCanselCurrent(index: any) {
        const update= this.state.update
        update[index] = false
        this.setState({update})
    }

    public render() {
            return (
                <Card {...this.state}>
                    <EditableText
                        isEditing={this.state.update[0]}
                        value={this.state.element.word}
                        onChange={this.handleReportChange.bind(this, 'word')}
                        onEdit={this.updateCurrent.bind(this, 0)}
                        onConfirm={this.onCanselCurrent.bind(this, 0)}
                    />
                    <hr/>
                    <EditableText
                        onChange={this.handleReportChange.bind(this, 'englishText')}
                        isEditing={this.state.update[1]}
                        value={this.state.element.englishText}
                        onEdit={this.updateCurrent.bind(this, 1)}
                        onConfirm={this.onCanselCurrent.bind(this, 1)}
                    />
                    <hr/>
                    <EditableText
                        onChange={this.handleReportChange.bind(this, 'russianText')}
                        placeholder="Filter phrases..."
                        isEditing={this.state.update[2]}
                        value={this.state.element.russianText}
                        onEdit={this.updateCurrent.bind(this, 2)}
                        onConfirm={this.onCanselCurrent.bind(this, 2)}
                    />
                    <hr/>
                    <Button
                        icon="duplicate"
                        onClick={this.state.save ? this.createItem : this.updateItem}
                    >
                        Save
                    </Button>
                </Card>
            )
    }

}

function mapStateToProps(state: any) {
    return {
        words: state.word
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
