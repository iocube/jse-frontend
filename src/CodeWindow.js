import React from 'react';

import AceEditor from './AceEditor';


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
        const ace = new AceEditor('codeEditor', {
            mode: 'ace/mode/javascript'
        });

        const codeWindowState = window.localStorage.getItem('jseCodeWindowState') || '';
        ace.editor.setValue(codeWindowState, -1);

        this.setState({
            editor: ace.editor,
            code: codeWindowState
        });

        ace.editor.getSession().on('change', function (e) {
            let code = this.state.editor.getValue();
            this.setState({
                code: code
            });

            this.props.onChange({code: code});
            window.localStorage.setItem('jseCodeWindowState', code);
        }.bind(this));
    }

    componentWillUnmount() {
        this.state.editor.removeAllListeners('change');
    }
}

export default CodeWindow;