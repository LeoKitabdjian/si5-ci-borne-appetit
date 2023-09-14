import React from 'react';
import styles from './Category.module.sass';

interface CategoryProps {}

interface CategoryState {}

class Category extends React.Component<CategoryProps, CategoryState> {

    constructor(props: CategoryProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={styles.Category}>
                Category Component
            </div>
        );
    }
}

export default Category;
