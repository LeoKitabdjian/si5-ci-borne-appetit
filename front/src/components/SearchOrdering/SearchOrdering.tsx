import React from 'react';
import styles from './SearchOrdering.module.sass';

interface SearchOrderingProps {
    addItemToOrder: (key: string) => void;
    items: Items;
}

interface SearchOrderingState {}

class SearchOrdering extends React.Component<SearchOrderingProps, SearchOrderingState> {

    constructor(props: SearchOrderingProps) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div className={styles.SearchOrdering}>
                SearchOrdering Component
            </div>
        );
    }
}

export default SearchOrdering;
