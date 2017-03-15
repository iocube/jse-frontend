import React from 'react';


class LanguageSelect extends React.Component {
    constructor(props) {
        super(props);

        this.languages = [
            {name: 'JavaScript', value: 'javascript'},
            {name: 'CoffeeScript', value: 'coffeescript'},
            {name: 'TypeScript', value: 'typescript'}
        ];

        this.state = {
            language: ''
        };

        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectLanguage(language) {
        if (this.state.language !== language.value) {

            this.setState({
                language: language.value
            });

            this.props.onLanguageSelect(language);
        }
    }

    render() {
        const languageOptions = this.languages.map(
            (language) => {
                const className = language.value === this.state.language ? 'language-item language-item--selected' : 'language-item';
                return <div className={className} key={language.name} onClick={() => this.selectLanguage(language)}>{language.name}</div>
            }
        );

        return (
            <div>
                Language Selector
                {languageOptions}
            </div>
        )
    }
}

LanguageSelect.propTypes = {
    onCloseClick: React.PropTypes.func,
    isOpen: React.PropTypes.bool,
    onLanguageSelect: React.PropTypes.func
};

export default LanguageSelect;