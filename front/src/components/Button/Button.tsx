import React from 'react';
import styles from './Button.module.sass';
import {ButtonType} from "./ButtonType";

interface ButtonProps {
    text: string;
    type: ButtonType;
    onClick?: () => void;
    isFull?: boolean;
    isDisabled?: boolean;
}

interface ButtonState {
}

class Button extends React.Component<ButtonProps, ButtonState> {

    constructor(props: ButtonProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (<div
            className={styles.Button + ' ' + styles[this.props.type] + ' ' + (this.props.isFull === true ? styles.Full : '') + ' ' + (this.props.isDisabled === true ? styles.Disabled : '')}
            onClick={this.props.onClick}>
            {this.props.text}
        </div>);
    }
}

export default Button;
