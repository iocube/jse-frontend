import React from 'react';


class ResultWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: {}
        }
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
        const editor = window.ace.edit("resultViewer");
        editor.setShowPrintMargin(false);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/json");
        editor.setReadOnly(true);

        this.setState({
            editor: editor
        });

        editor.setValue(this.props.executionResult);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.executionResult) !== JSON.stringify(this.props.executionResult)) {
            this.state.editor.setValue(JSON.stringify(nextProps.executionResult, null, '\t'), 1);
            // move the cursor to the end

        } else if (JSON.stringify(nextProps.executionError) !== JSON.stringify(this.props.executionError)) {
            const stack = nextProps.executionError.stack;

            const errorDescription = `${stack}`;
            this.state.editor.setValue(errorDescription, 1);
        }
    }
}


export default ResultWindow;