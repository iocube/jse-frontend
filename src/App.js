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
import LanguageSelect from './LanguageSelect';
import Modal from './Modal';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            context: '',
            executionResult: '',
            executionError: '',
            isModuleSelectOpen: false,
            selectedModules: [],
            isLanguageSelectOpen: false,
            selectedLanguage: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onRunClick = this.onRunClick.bind(this);
        this.openModuleSelect = this.openModuleSelect.bind(this);
        this.closeModuleSelect = this.closeModuleSelect.bind(this);
        this.onModuleUpdate = this.onModuleUpdate.bind(this);
        this.openLanguageSelect = this.openLanguageSelect.bind(this);
        this.closeLanguageSelect = this.closeLanguageSelect.bind(this);
        this.onLanguageSelect = this.onLanguageSelect.bind(this);
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

    onModuleUpdate(selectedModules) {
        this.setState({
            selectedModules: selectedModules
        });
    }

    openLanguageSelect() {
        this.setState({
            isLanguageSelectOpen: true
        })
    }

    closeLanguageSelect() {
        this.setState({
            isLanguageSelectOpen: false
        })
    }

    onLanguageSelect(language) {
        this.setState({
            selectedLanguage: language.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    <RunButton onRunClick={this.onRunClick}/>

                    <button onClick={this.openModuleSelect}>Modules</button>
                    <Modal onCloseClick={this.closeModuleSelect}
                            isOpen={this.state.isModuleSelectOpen}>
                        <ModuleSelect onUpdate={this.onModuleUpdate}/>
                    </Modal>

                    <button onClick={this.openLanguageSelect}>Language</button>
                    <Modal onCloseClick={this.closeLanguageSelect}
                            isOpen={this.state.isLanguageSelectOpen}>
                        <LanguageSelect onLanguageSelect={this.onLanguageSelect}/>
                    </Modal>
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