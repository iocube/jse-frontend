import React from 'react';


class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onCloseClickWrapper = this.onCloseClickWrapper.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.isOpen && newProps.isOpen) {
            console.log('add event');
            document.body.addEventListener('click', this.handleClick);
        }
    }

    handleClick(ev) {
        if ((ev.target !== this.element) && (!this.element.contains(ev.target))) {
            this.onCloseClickWrapper();
        }
    }

    onCloseClickWrapper() {
        console.log('remove event');
        document.body.removeEventListener('click', this.handleClick);
        this.props.onCloseClick();
    }

    render() {
        const isVisible = this.props.isOpen ? 'block' : 'none';
            return (
                <div style={{display: isVisible}} ref={(e) => {this.element = e;}}>
                    {this.props.children}
                    <button onClick={this.onCloseClickWrapper}>Close</button>
                </div>
            )
    }
}

Modal.propTypes = {
    isOpen: React.PropTypes.bool,
    onCloseClick: React.PropTypes.func
};

export default Modal;