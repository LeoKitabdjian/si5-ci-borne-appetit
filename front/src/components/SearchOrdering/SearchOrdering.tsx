import React from 'react';
import styles from './SearchOrdering.module.sass';
import Item from "../Item/Item";

interface SearchOrderingProps {
    addItemToOrder: (key: string) => void;
    items: BasicItem[];
}

interface SearchOrderingState {
}

class SearchOrdering extends React.Component<SearchOrderingProps, SearchOrderingState> {

    constructor(props: SearchOrderingProps) {
        super(props);
        this.state = {};
    }

    isEmpty = () => Object.entries(this.props.items).length === 0;

    render() {
        return (<section
            className={styles.SearchOrdering + " " + (this.isEmpty() ? styles.Empty : "")}>
            {this.isEmpty() && "Pas de résultat"}
            {Object.entries(this.props.items).map(([id, item], index) => <Item key={index}
                                                                               addItemToOrder={this.props.addItemToOrder}
                                                                               name={item.name}
                                                                               price={item.price.toString()} id={id}
                                                                               img={item.image}/>)}
        </section>);
    }
}

export default SearchOrdering;
