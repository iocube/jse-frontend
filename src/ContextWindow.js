import React from 'react';

import AceEditor from './AceEditor';


class ContextWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            context: '',
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
            <div id="contextEditor" style={divStyle}></div>
        )
    }

    componentDidMount() {
        const ace = new AceEditor('contextEditor', {});

        const contextWindowState = window.localStorage.getItem('jseContextWindowState') || '';
        ace.editor.setValue(contextWindowState, -1);

        this.setState({
            editor: ace.editor,
            context: contextWindowState
        });

        ace.editor.getSession().on('change', function () {
            let context = this.state.editor.getValue();
            this.setState({
                context: context
            });

            this.props.onChange({context: context});
            window.localStorage.setItem('jseContextWindowState', context);
        }.bind(this));
    }

    componentWillUnmount() {
        this.state.editor.removeAllListeners('change');
    }
}

export default ContextWindow;