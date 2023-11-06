import React from 'react';
import styles from './Item.module.sass';
import {OrderAction} from "../../../order.action";

interface ItemProps {
    id: string;
    quantity: number;
    name: string;
    price: number;
}

const Item = (props: ItemProps) => <div className={styles.Item}>
    <div className={styles.Name}>{props.name}</div>
    <div className={styles.Price}>{props.price} €</div>
</div>;

export default Item;
