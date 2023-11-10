import React from 'react';
import styles from './TemplateName.module.sass';

interface TemplateNameProps {}

interface TemplateNameState {}

class TemplateName extends React.Component<TemplateNameProps, TemplateNameState> {

    constructor(props: TemplateNameProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={styles.TemplateName}>
                TemplateName Component
            </div>
        );
    }
}

export default TemplateName;
