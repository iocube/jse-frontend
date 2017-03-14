import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';

import jse from './jse.js';
import CodeWindow from './CodeWindow';
import ContextWindow from './ContextWindow';
import ResultWindow from './ResultWindow';
import RunButton from './RunButton';
import ModuleSelect from './ModuleSelect';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            context: '',
            executionResult: '',
            executionError: '',
            isModuleSelectOpen: false
        };

        this.onChange = this.onChange.bind(this);
        this.onRunClick = this.onRunClick.bind(this);
        this.openModuleSelect = this.openModuleSelect.bind(this);
        this.closeModuleSelect = this.closeModuleSelect.bind(this);
    }

    onChange(updated) {
        this.setState(updated);
    }

    onRunClick() {
        jse.run(this.state.code, JSON.parse(this.state.context))
            .then(executionResult => {
                this.setState({executionResult: executionResult});
            })
            .catch(executionError => {
                this.setState({executionError: executionError});
            });
    }

    openModuleSelect() {
        this.setState({
            isModuleSelectOpen: true
        });
    }

    closeModuleSelect() {
        this.setState({
            isModuleSelectOpen: false
        });
    }

    render() {
        return (
            <div>
                <div>
                    <RunButton onRunClick={this.onRunClick}/>
                    <button onClick={this.openModuleSelect}>Modules</button>
                    <ModuleSelect onCloseClick={this.closeModuleSelect}
                                  isOpen={this.state.isModuleSelectOpen}/>
                    <button>Language</button>
                </div>
                <CodeWindow onChange={this.onChange}/>
                <ContextWindow onChange={this.onChange}/>
                <ResultWindow executionResult={this.state.executionResult} executionError={this.state.executionError}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

export default App;