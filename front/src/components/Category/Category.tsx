import React from 'react';
import styles from './Category.module.sass';

interface CategoryProps {
    id: string;
    changeCategoryFunction: (key: string) => void;
    name: string;
}

interface CategoryState {}

class Category extends React.Component<CategoryProps, CategoryState> {

    constructor(props: CategoryProps) {
        super(props);
        this.state = {};
    }

    changeCategoryFunction = () => {
        this.props.changeCategoryFunction(this.props.id);
    }

    render() {
        return (
            <div className={styles.Category} onClick={this.changeCategoryFunction}>
                {this.props.name}
            </div>
        );
    }
}

export default Category;
