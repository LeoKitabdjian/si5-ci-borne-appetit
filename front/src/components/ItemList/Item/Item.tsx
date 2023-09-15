import React from 'react';
import styles from './Item.module.sass';

interface ItemProps {
    addItemToOrder: (key: string) => void;
    name: string;
    price: string;
    id: string;
    img: string;
}

interface ItemState {}

class Item extends React.Component<ItemProps, ItemState> {

    constructor(props: ItemProps) {
        super(props);
        this.state = {};
    }

    addItem = () => {
        this.props.addItemToOrder(this.props.id);
    }


    render() {
        return (
            <article className={styles.Item} onClick={this.addItem}>
                <div className={styles.Title}>
                    {this.props.name}
                </div>
                <div className={styles.Image}>
                    <img src={this.props.img} alt=""/>
                    <span className={styles.Price}>{this.props.price} €</span>
                </div>
            </article>
        );
    }
}

export default Item;
