import React from 'react';
import styles from './ItemList.module.sass';
import Item from "../Item/Item";

interface ItemListProps {
    id: string;
    items: ItemList;
    addItemToOrder: (key: string) => void;
    isActive: boolean;
    name: string;
}

class ItemList extends React.Component<ItemListProps> {

    constructor(props: ItemListProps) {
        super(props);
        this.state = {};
    }

    render = () => <div className={styles.ItemList + " " + (this.props.isActive ? "" : styles.Hidden)}>
        {Object.entries(this.props.items).map(([id, item], index) => {
            return <Item key={index}
                         addItemToOrder={this.props.addItemToOrder}
                         name={item.name}
                         img={item.image}
                         price={item.price}
                         id={id}/>
        })}
    </div>;
}

export default ItemList;
