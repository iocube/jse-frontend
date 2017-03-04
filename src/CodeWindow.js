import React from 'react';


class CodeWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            editor: {}
        };
    }

    render() {
        const divStyle = {
            display: 'inline-block',
            width: '50%',
            height: '200px'
        };

        return (
            <div id="codeEditor" style={divStyle}></div>
        )
    }

    componentDidMount() {
        const editor = window.ace.edit("codeEditor");
        editor.setShowPrintMargin(false); // hide vertical line
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");

        this.setState({
            editor: editor
        });

        editor.getSession().on('change', function (e) {
            let code = editor.getValue();
            this.setState({
                code: code
            });

            this.props.onChange({code: code});
        }.bind(this));
    }

    componentWillUnmount() {
        this.state.editor.removeAllListeners('change');
    }
}

export default CodeWindow;