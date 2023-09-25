import React from 'react';
import styles from './Item.module.sass';
import {OrderAction} from "../../../order.action";

interface ItemProps {
    id: string;
    quantity: number;
    name: string;
    price: number;
    handleOrderAction: (id: string, action: OrderAction) => void;
}

class Item extends React.Component<ItemProps> {

    constructor(props: ItemProps) {
        super(props);
    }

    render = () => <div className={styles.Item}>
        <div className={styles.Name}>{this.props.name}</div>
        <div className={styles.Price}>{this.props.price * this.props.quantity} €</div>
        <div className={styles.Actions}>
            <div className={styles.Quantity}>
                <span className={styles.RoundButton} onClick={() => this.props.handleOrderAction(this.props.id, OrderAction.REMOVE)}>
                    <img src="/images/minus.svg" alt=""/>
                </span>
                <span>{this.props.quantity}</span>
                <span className={styles.RoundButton} onClick={() => this.props.handleOrderAction(this.props.id, OrderAction.ADD)}>
                    <img src="/images/add.svg" alt=""/>
                </span>
            </div>
            <span className={styles.RoundButton + " " + styles.DeleteButton} onClick={() => this.props.handleOrderAction(this.props.id, OrderAction.DELETE)}>
                <img src="/images/close.svg" alt=""/>
            </span>
        </div>
    </div>;
}

export default Item;
