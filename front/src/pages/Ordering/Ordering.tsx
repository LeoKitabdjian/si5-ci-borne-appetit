import React from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {getItems, getMenu} from "../../services/MenuService";
import Selection from "../../components/Selection/Selection";
import SearchBar from "../../components/SearchBar/SearchBar";
import DefaultOrdering from "../../components/DefaultOrdering/DefaultOrdering";
import SearchOrdering from "../../components/SearchOrdering/SearchOrdering";

interface OrderingProps {
}

interface OrderingState {
    order: OrderItem[];
    menu: Menu;
    items: Items;
    search: string;
}

class Ordering extends React.Component<OrderingProps, OrderingState> {

    constructor(props: OrderingProps) {
        super(props);
        let menu = getMenu();
        let items = getItems();
        this.state = {
            order: [], menu: menu, items: items, search: ""
        }
    }

    addItemToOrder = (key: string) => {
        let order = this.state.order;
        let index = order.findIndex((item: OrderItem) => item.id === key);
        if (index === -1) order.push({id: key, quantity: 1}); else order[index].quantity++;
        this.setState({
            order: order
        });
    }

    updateSearch = (search: string) => {
        this.setState({search: search});
    }


    render() {
        return <div className={styles.Ordering}>
            <main>
                <SearchBar updateSearch={this.updateSearch}/>
                {this.state.search === "" && <DefaultOrdering menu={this.state.menu} addItemToOrder={this.addItemToOrder}/>}
                {this.state.search !== "" && <SearchOrdering items={this.state.items} addItemToOrder={this.addItemToOrder}/>}
                <Selection items={this.state.items} order={this.state.order}/>
            </main>
            <div className={styles.Actions}>
                <GoBackButton/>
                <OrderButton/>
            </div>
        </div>;
    }
}

function GoBackButton() {
    const navigate = useNavigate();
    const nav = () => navigate('/');
    return (<Button type={ButtonType.Danger} text={"Annuler"} onClick={nav}/>);
}

function OrderButton() {
    const navigate = useNavigate();
    const nav = () => navigate('/ordering');
    return (<Button type={ButtonType.Info} text={"Commander"} onClick={nav}/>);
}

export default Ordering;
