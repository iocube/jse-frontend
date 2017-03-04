import React from 'react';


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
        const editor = window.ace.edit("contextEditor");
        editor.setShowPrintMargin(false);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/json");

        this.setState({
            editor: editor
        })

        editor.getSession().on('change', function (e) {
            let context = editor.getValue();
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