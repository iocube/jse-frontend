import React from 'react';

import jse from './jse';


class ModuleSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredModules: [],
            selectedModules: []
        };

        this.filterByModuleName = this.filterByModuleName.bind(this);
        this.toggleModule = this.toggleModule.bind(this);
    }

    filterByModuleName(event) {
        console.log(event.target.value);

        if (event.target.value) {
            this.setState({
                filteredModules: this.modules.filter(
                    m => m.name.indexOf(event.target.value) >= 0
                )
            });
        } else {
            this.setState({
                filteredModules: this.modules
            });
        }
    }

    toggleModule(moduleName) {
        let updatedModules;

        if (this.state.selectedModules.indexOf(moduleName) >= 0) {
            // remove
            updatedModules = this.state.selectedModules.concat();
            updatedModules.splice(this.state.selectedModules.indexOf(moduleName), 1);

            this.setState({
                selectedModules: updatedModules
            });
        } else {
            updatedModules = this.state.selectedModules.concat(moduleName);
            this.setState({
                selectedModules: updatedModules
            });
        }

        this.props.onUpdate(updatedModules);
    }

    render() {
        const modules = this.state.filteredModules.map((module) => {
            let className = this.state.selectedModules.indexOf(module.name) >= 0 ? 'module-item module-item--selected' : 'module-item';

            return <li className={className} onClick={() => this.toggleModule(module.name)}
                       key={module.name}>name: {module.name}, alias: {module.alias}
                   </li>
        });

        return (
            <div>
                <input type="text" onChange={this.filterByModuleName}/>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {modules}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        jse.getModules().then(function(modules) {
            this.modules = modules;

            this.setState({
                filteredModules: modules
            });
        }.bind(this))
        .catch(function(error) {
            console.log('failed to fetch modules: ', error);
        });
    }
}

ModuleSelect.propTypes = {
    isOpen: React.PropTypes.bool,
    onCloseClick: React.PropTypes.func,
    onUpdate: React.PropTypes.func
};


export default ModuleSelect;