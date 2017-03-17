import React from 'react';

import AceEditor from './AceEditor';


class ResultWindow extends React.Component {
    constructor(props) {
        super(props);
        this.editor = {}
    }

    render() {
        const divStyle = {
            display: 'inline-block',
            width: '50%',
            height: '200px'
        };

        return (
            <div id="resultViewer" style={divStyle}></div>
        )
    }

    componentDidMount() {
        const ace = new AceEditor('resultViewer', {
            readOnly: true
        });

        this.editor = ace.editor;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.executionResult !== this.props.executionResult) {
            this.editor.setValue(nextProps.executionResult, 1);
        }
    }
}


export default ResultWindow;