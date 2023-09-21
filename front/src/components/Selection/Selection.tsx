import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";

interface SelectionProps {
    order: OrderItem[];
    items: Items;
}

interface SelectionState {
}

class Selection extends React.Component<SelectionProps, SelectionState> {

    constructor(props: SelectionProps) {
        super(props);
        this.state = {};
    }

    getItem = (id: string): VeryBasicItem => this.props.items[id];

    getTotalItems = (): number => this.props.order.reduce((total, item) => total + item.quantity, 0);

    getTotalPrice = (): number => this.props.order.reduce((total, item) => total + this.getItem(item.id).price * item.quantity, 0);

    render() {
        return <div className={styles.Selection}>
            <div className={styles.Header}>
                <h1>Votre commande</h1>
            </div>
            <div className={styles.Items}>
                {this.props.order.map((item: OrderItem, index: number) => {
                    return <Item key={index} quantity={item.quantity}
                                 id={item.id}
                                 name={this.getItem(item.id).name}
                    />
                })}
            </div>
            <div className={styles.Footer}>
                Total : {this.getTotalItems()} articles {this.getTotalPrice()} euros
            </div>
        </div>;
    }
}

export default Selection;
