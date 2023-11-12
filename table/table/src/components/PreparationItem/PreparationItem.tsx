import React from 'react';
import styles from './PreparationItem.module.sass';

interface PreparationItemProps {
    id: string;
    quantity: number;
}

interface PreparationItemState {
    items: Items;
}

class PreparationItem extends React.Component<PreparationItemProps, PreparationItemState> {

    constructor(props: PreparationItemProps) {
        super(props);
        this.state = {
            items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items') as string) : ({} as Items),
        };
    }

    render = () => (<article className={styles.Item}>
        {this.state.items[this.props.id] ? this.state.items[this.props.id].name : this.props.id}
        <span className={styles.Quantity}>(x{this.props.quantity})</span>
    </article>);
}

export default PreparationItem;
