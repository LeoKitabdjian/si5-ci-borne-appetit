import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";
import {Order} from "../../order";
import {OrderAction} from "../../order.action";

interface SelectionProps {
    handleSelection: () => void;
    order: Order;
    items: Items;
    isOpen: boolean;
    handleOrderUpdate: (id: string, action: OrderAction) => void;
}

class Selection extends React.Component<SelectionProps> {

    constructor(props: SelectionProps) {
        super(props);
        console.log(this.props)
    }

    getItem = (id: string): VeryBasicItem => this.props.items[id];

    collapseSelection = () => this.props.handleSelection()

    handleOrderAction = (id: string, action: OrderAction) => this.props.handleOrderUpdate(id, action)

    render() {
        return <div className={styles.Selection + " " + (this.props.isOpen ? styles.IsOpen : "")}>
            <div onClick={this.collapseSelection} className={styles.Header}>
                <h1>Votre commande</h1>
                <span className={styles.Collapser}></span>
            </div>
            <div className={styles.Items}>
                {Object.entries(this.props.order.items).map(([id, quantity]) => {
                    return <Item key={id} quantity={quantity}
                                 id={id}
                                 name={this.getItem(id).name}
                                 price={this.getItem(id).price}
                                 handleOrderAction={this.handleOrderAction}
                    />
                })}
            </div>
            <div className={styles.Footer}>
                Total
                : {this.props.order.getTotalQuantity()} articles {this.props.order.getTotalPrice(this.props.items)} euros
            </div>
        </div>;
    }
}

export default Selection;
