import React from 'react';
import styles from './SearchOrdering.module.sass';
import Item from "../ItemList/Item/Item";

interface SearchOrderingProps {
    addItemToOrder: (key: string) => void;
    items: BasicItem[];
}

interface SearchOrderingState {}

class SearchOrdering extends React.Component<SearchOrderingProps, SearchOrderingState> {

    constructor(props: SearchOrderingProps) {
        super(props);
        this.state = {};
        console.log(this.props.items)
    }


    render() {
        return (
            <div className={styles.SearchOrdering}>
                {Object.entries(this.props.items).map(([id, item], index) => {
                    return <Item addItemToOrder={this.props.addItemToOrder} name={item.name} price={item.price.toString()} id={id} img={item.image}/>
                })}
            </div>
        );
    }
}

export default SearchOrdering;
