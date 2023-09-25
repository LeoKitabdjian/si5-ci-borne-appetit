import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";
import {Order} from "../../order";

interface SelectionProps {
    handleSelection: () => void;
    order: Order;
    items: Items;
    isOpen: boolean;
}

class Selection extends React.Component<SelectionProps> {

    constructor(props: SelectionProps) {
        super(props);
        this.state = {};
    }

    getItem = (id: string): VeryBasicItem => this.props.items[id];


    collapseSelection = () => {
        this.props.handleSelection();
    }

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
                                 price={this.getItem(id).price}/>
                })}
            </div>
            <div className={styles.Footer}>
                Total : {this.props.order.getTotalQuantity()} articles {this.props.order.getTotalPrice(this.props.items)} euros
            </div>
        </div>;
    }
}

export default Selection;
