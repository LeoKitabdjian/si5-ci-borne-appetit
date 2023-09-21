import React from 'react';
import styles from './ItemList.module.sass';
import Item from "./Item/Item";

interface ItemListProps {
    id: string;
    items: ItemList;
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
                <div className={styles.ItemList}>
                    {Object.entries(this.props.items).map(([id, item], index) =>
                        <Item addItemToOrder={this.props.addItemToOrder}
                              name={item.name}
                              img={item.image}
                              price={item.price}
                              id={id}
                              key={index}/>
                    )}
                </div>
        </div>;
    }
}

export default ItemList;
