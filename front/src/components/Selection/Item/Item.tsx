import React from 'react';
import styles from './Item.module.sass';

interface ItemProps {
    id: string;
    quantity: number;
    name: string;
}
const Item = (props: ItemProps) => <div className={styles.Item}>
    <div className={styles.Name}>{props.name}</div>
    <div className={styles.ItemQuantity}>{props.quantity}</div>
</div>;

export default Item;
