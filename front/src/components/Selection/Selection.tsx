import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";
import {Order} from "../../order";
import {OrderAction} from "../../order.action";
import {withTranslation} from "react-i18next";
import {CustomerAction} from "../../customer.action";

interface SelectionProps {
    t: any;
    handleSelection: () => void;
    order: Order;
    items: Items;
    isOpen: boolean;
    handleOrderUpdate: (id: string, action: OrderAction) => void;
    handleCustomerUpdate: (action: CustomerAction) => void;
}

class Selection extends React.Component<SelectionProps> {

    constructor(props: SelectionProps) {
        super(props);
        console.log(this.props)
    }

    getItem = (id: string): Item => this.props.items[id];

    collapseSelection = () => this.props.handleSelection()

    handleOrderAction = (id: string, action: OrderAction) => this.props.handleOrderUpdate(id, action)

    render() {
        const {t} = this.props;
        return <div className={styles.Selection + " " + (this.props.isOpen ? styles.IsOpen : "")}>
            <div onClick={this.collapseSelection} className={styles.Header}>
                <h1>{t('selection.order')}</h1>
                <span className={styles.Collapser}></span>
            </div>
            <div className={styles.Items}>
                {Object.entries(this.props.order.items).map(([id, quantity]) => {
                    return <Item key={id} quantity={quantity}
                                 id={id}
                                 name={this.getItem(id).name}
                                 price={this.props.order.getPrice(id, this.props.items)}
                                 handleOrderAction={this.handleOrderAction}
                    />
                })}
            </div>
            <div className={styles.Footer}>
                <div>{t('selection.total')}</div>
                <div>{t('selection.item', {count: this.props.order.size()})}</div>
                <div>{t('selection.price', {count: this.props.order.getTotalPrice(this.props.items)})}</div>
            </div>
            {this.props.isOpen && <div className={styles.Customers}>
                <div className={styles.Action} onClick={() => this.props.handleCustomerUpdate(CustomerAction.REMOVE)}>
                    <img src="/images/minus.svg" alt=""/>
                </div>
                <div className={styles.Counter}>{t('selection.customer', {count: this.props.order.customers})}</div>
                <div className={styles.Action} onClick={() => this.props.handleCustomerUpdate(CustomerAction.ADD)}>
                    <img src="/images/add.svg" alt=""/>
                </div>
            </div>}
        </div>;
    }
}

export default withTranslation()(Selection);
