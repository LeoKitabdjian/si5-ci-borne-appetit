import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";

interface SelectionProps {
    order: OrderItem[];
    items: any;
}

interface SelectionState {
}

class Selection extends React.Component<SelectionProps, SelectionState> {

    constructor(props: SelectionProps) {
        super(props);
        this.state = {};
    }

    getTotalItems(): number {
        let i = 0;
        for(let item of this.props.order) {
            i += item.quantity
        }
        return i;
    }

    getTotalPrice(): number {
        let price = 0;
        for(let item of this.props.order) {
            price += this.props.items[item.id].price * item.quantity
        }
        return price;
    }

    render() {
        return <div className={styles.Selection}>
                <div className={styles.Header}>
                    <h1>Votre commande</h1>
                </div>
                <div className={styles.Selection}>
                    {this.props.order.map((item: OrderItem, index: number) => <Item key={index} quantity={item.quantity}
                                                                                    id={item.id}
                                                                                    name={this.props.items[item.id].name}
                                                    />)}
                </div>
                <div className={styles.Footer}>
                    Total : {this.getTotalItems()} articles {this.getTotalPrice()} euros
                </div>
            </div>;
    }
}

export default Selection;
