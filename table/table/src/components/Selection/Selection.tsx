import React from 'react';
import styles from './Selection.module.sass';
import Item from "./Item/Item";
import {Order} from "../../order";
import {OrderAction} from "../../order.action";
import {withTranslation} from "react-i18next";
import {CustomerAction} from "../../customer.action";

interface SelectionProps {
    t: any;
    order: Order;
    items: Items;
}

class Selection extends React.Component<SelectionProps> {

    constructor(props: SelectionProps) {
        super(props);
    }

    getItem = (id: string): Item => this.props.items[id];

    render() {
        const {t} = this.props;
        return <div className={styles.Selection}>
            <div className={styles.Header}>
                <h1>{t('selection.order')}</h1>
            </div>
            <div className={styles.Items}>
                {Object.entries(this.props.order.getCustomers()).map(([id, quantity]) => {
                    return <Item key={id} quantity={quantity}
                                 id={id}
                                 name={this.getItem(id).name}
                                 //price={this.props.order.getPrice(id, this.props.items)}
                                 price={0}
                    />
                })}
            </div>
            <div className={styles.Footer}>
                <div>{t('selection.total')}</div>
                <div>{t('selection.item', {count: this.props.order.size})}</div>
                <div>{t('selection.price', {count: this.props.order.totalPrice})}</div>
            </div>
        </div>;
    }
}

export default withTranslation()(Selection);
