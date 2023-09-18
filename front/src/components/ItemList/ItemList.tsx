import React from 'react';
import styles from './ItemList.module.sass';
import Item from "./Item/Item";

interface ItemListProps {
    id: string;
    items: any[];
    addItemToOrder: (key: string) => void;
    isActive: boolean;
    name: string;
}

interface ItemListState {
}

class ItemList extends React.Component<ItemListProps, ItemListState> {

    constructor(props: ItemListProps) {
        super(props);
        this.state = {};
    }


    render() {
        return <div className={this.props.isActive ? "" : styles.hidden}>
                <h1><span>{this.props.name}</span></h1>
                <div className={styles.ItemList}>
                    {this.props.items.map((item, index) => <Item addItemToOrder={this.props.addItemToOrder}
                                                                 name={item.fullName}
                                                                 img={item.image}
                                                                 price={item.price}
                                                                 id={item._id}
                                                                 key={index}/>)}
                </div>
        </div>;
    }
}

export default ItemList;
