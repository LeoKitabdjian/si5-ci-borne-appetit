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

const Item = (props: ItemProps) => <div className={styles.Item}>
    <div className={styles.Name}>{props.name}</div>
    <div className={styles.Price}>{props.price} €</div>
    <div className={styles.Actions}>
        <div className={styles.Quantity}>
                    <span className={styles.RoundButton}
                          onClick={() => props.handleOrderAction(props.id, OrderAction.REMOVE)}>
                        <img src="/images/minus.svg" alt=""/>
                    </span>
            <span>{props.quantity}</span>
            <span className={styles.RoundButton}
                  onClick={() => props.handleOrderAction(props.id, OrderAction.ADD)}>
                        <img src="/images/add.svg" alt=""/>
                    </span>
        </div>
        <span className={styles.RoundButton + " " + styles.DeleteButton}
              onClick={() => props.handleOrderAction(props.id, OrderAction.DELETE)}>
                    <img src="/images/close.svg" alt=""/>
                </span>
    </div>
</div>;

export default Item;
