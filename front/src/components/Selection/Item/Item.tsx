import React from 'react';
import styles from './Item.module.sass';

interface ItemProps {
    id: string;
    quantity: number;
    name: string;
    price: number;
}

const Item = (props: ItemProps) => <div className={styles.Item}>
    <div className={styles.Name}>{props.name}</div>
    <div className={styles.Price}>{props.price * props.quantity} €</div>
    <div className={styles.Actions}>
        <div className={styles.Quantity}>
            <span className={styles.RoundButton}>
                <img src="/images/minus.svg" alt=""/>
            </span>
            <span>{props.quantity}</span>
            <span className={styles.RoundButton}>
                <img src="/images/add.svg" alt=""/>
            </span>
        </div>
        <span className={styles.RoundButton + " " + styles.DeleteButton}>
            <img src="/images/close.svg" alt=""/>
        </span>
    </div>
</div>;

export default Item;
