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

        this.setState({
            editor: ace.editor
        });

        ace.editor.getSession().on('change', function () {
            let context = this.state.editor.getValue();
            this.setState({
                context: context
            });

            this.props.onChange({context: context});
        }.bind(this));
    }

    componentWillUnmount() {
        this.state.editor.removeAllListeners('change');
    }
}

export default ContextWindow;