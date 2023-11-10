import React from 'react';
import styles from './Customer.module.sass';
import Item from "../Item/Item";

interface Customer {
    clientId: number;
    orderRecord: OrderRecord;
    items: Items;
}

const Customer = (props: Customer) => <div className={styles.Customer}>
    <div className={styles.Header}>
        <div className={styles.Name}>Tablette {props.clientId}</div>
        <div className={styles.Price}>{props.orderRecord.price} €</div>
    </div>
    <div className={styles.Items}>
        {Object.entries(props.orderRecord.items).map((i) => {
            return <Item id={i[0]} quantity={i[1]} name={props.items[i[0]].name} price={props.items[i[0]].price}/>
        })}
    </div>
</div>;

export default Customer;
