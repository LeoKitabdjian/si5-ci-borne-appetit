import React from 'react';
// @ts-ignore
import styles from './Test.style.sass';

interface TestProps {}

interface TestState {}

class Test extends React.Component<TestProps, TestState> {

    constructor(props: TestProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={styles.Test}>
                Test Component
x            </div>
        );
    }
}

export default Test;
