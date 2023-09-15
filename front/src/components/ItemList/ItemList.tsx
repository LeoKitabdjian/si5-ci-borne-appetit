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
        return <>
            {this.props.isActive && <>
                <h1>{this.props.name}</h1>
                <div className={styles.ItemList}>
                    {this.props.items.map((item, index) => <Item addItemToOrder={this.props.addItemToOrder}
                                                                 name={item.fullName}
                                                                 img={item.image}
                                                                 price={item.price}
                                                                 id={item._id}
                                                                 key={index}/>)}
                </div>
            </>}
        </>;
    }
}

export default ItemList;
