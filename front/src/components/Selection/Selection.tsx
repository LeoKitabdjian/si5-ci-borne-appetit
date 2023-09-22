import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";

interface SelectionProps {
    handleSelection: () => void;
    order: OrderItem[];
    items: Items;
    isOpen: boolean;
}

class Selection extends React.Component<SelectionProps> {

    constructor(props: SelectionProps) {
        super(props);
        this.state = {};
    }

    getItem = (id: string): VeryBasicItem => this.props.items[id];

    getTotalItems = (): number => this.props.order.reduce((total, item) => total + item.quantity, 0);

    getTotalPrice = (): number => this.props.order.reduce((total, item) => total + this.getItem(item.id).price * item.quantity, 0);

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
