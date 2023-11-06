import React from 'react';
import styles from './Selection.module.sass';
import {Order} from "../../order";
import {withTranslation} from "react-i18next";
import Customer from "./Customer/Customer";

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
            <div className={styles.Customers}>
                {this.props.order.getClientIds().map((clientId) => {
                    return <Customer items={this.props.items} clientId={clientId} orderRecord={this.props.order[clientId]}/>
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
