import React, {useState} from 'react';
import styles from './Table.module.sass';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Selection from "../../components/Selection/Selection";
import {getOrder} from "../../services/OrderService";
import {getItems} from "../../services/MenuService";
import {Order} from '../../order';

interface StandbyProps {
    t: any;
    navigate: any;
    location: any;
    searchParams: any;
}

interface StandbyState {
    order: Order;
    items: Items;
}


function Table() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [t] = useTranslation();

    return <TableWithoutHook navigate={navigate} location={location} searchParams={searchParams} t={t}/>;
}

class TableWithoutHook extends React.Component<StandbyProps, StandbyState> {

    constructor(props: StandbyProps) {
        super(props);
        getItems().then((r) => {
            this.setState({items: r});
        });
    }

    componentDidMount() {
        const {t} = this.props;
        const urlParams = this.props.searchParams.toString();
        const tableId = this.props.searchParams.get('tableId');
        if (!tableId) this.props.navigate('/error?' + urlParams, {state: {error: t('error.tableId')}});
        if (tableId) {
            getOrder(tableId).then((r) => {
                this.setState({order: r})
            });
        }
    }

    render() {
        return <div className={styles.Standby}>
            <main>
                <Selection items={this.state.items} order={this.state.order}/>
            </main>
        </div>;
    }
}

export default Table;
