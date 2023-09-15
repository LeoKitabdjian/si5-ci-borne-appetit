import React from 'react';
import styles from './ItemList.module.sass';
import Item from "../Item/Item";

interface ItemListProps {
    id: string;
    items: any[];
    addItemFunction: (key: string) => void;
    isActive: boolean;
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
                {this.props.isActive && <div className={styles.ItemList}>
                    {this.props.items.map((item, index) =>
                        <Item addItemFunction={this.props.addItemFunction}
                              name={item.fullName}
                              img={item.image}
                              price={item.price}
                              id={item._id}
                              key={index}/>
                    )}
                </div>}
            </>;
    }
}

export default ItemList;
