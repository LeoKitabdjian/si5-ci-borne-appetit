import React, {useState} from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {findItems, getItems, getMenu} from "../../services/MenuService";
import Selection from "../../components/Selection/Selection";
import SearchBar from "../../components/SearchBar/SearchBar";
import DefaultOrdering from "../../components/DefaultOrdering/DefaultOrdering";
import SearchOrdering from "../../components/SearchOrdering/SearchOrdering";
import {Order} from "../../order";
import {OrderAction} from "../../order.action";
import {sendOrder} from "../../services/DiningService";

interface OrderingProps {
}

interface OrderingState {
    order: Order;
    menu: Menu;
    items: Items;
    search: string;
    selectionMinimized: boolean;
}

class Ordering extends React.Component<OrderingProps, OrderingState> {

    constructor(props: OrderingProps) {
        super(props);
        let menu = getMenu();
        let items = getItems();
        this.state = {
            order: new Order(), menu: menu, items: items, search: "", selectionMinimized: true
        }
    }

    updateOrder = (id: string, action: OrderAction) => {
        if (action === OrderAction.ADD) this.state.order.addItem(id);
        else if (action === OrderAction.DELETE) this.state.order.deleteItem(id);
        else if (action === OrderAction.REMOVE) this.state.order.removeItem(id);
        // update the state of the object to apply on children
        this.setState({
            order: this.state.order
        })
    }

    addItemToOrder = (key: string) => this.updateOrder(key, OrderAction.ADD)

    updateSearch = (search: string) => this.setState({search: search})

    getSearchedItems = (): BasicItem[] => findItems(this.state.search)

    handleSelection = () => this.setState({selectionMinimized: !this.state.selectionMinimized})

    render() {
        return <div className={styles.Ordering + " " + (!this.state.selectionMinimized ? styles.HasSelection : "")}>
            <main>
                {this.state.selectionMinimized && <SearchBar updateSearch={this.updateSearch}/>}
                {this.state.selectionMinimized && this.state.search === "" &&
                    <DefaultOrdering menu={this.state.menu} addItemToOrder={this.addItemToOrder}/>}
                {this.state.selectionMinimized && this.state.search !== "" &&
                    <SearchOrdering items={this.getSearchedItems()} addItemToOrder={this.addItemToOrder}/>}
                <Selection isOpen={!this.state.selectionMinimized} handleSelection={this.handleSelection}
                           items={this.state.items} order={this.state.order} handleOrderUpdate={this.updateOrder}/>
            </main>
            <div className={styles.Actions}>
                <GoBackButton/>
                <OrderButton order={this.state.order}/>
            </div>
        </div>;
    }
}

// @ts-ignore
function OrderButton({order}) {
    const navigate = useNavigate();
    useState("order")
    const nav = (order: Order) => {
        sendOrder(order).then((tableNumber: number) => {
            let params = {state: {tn:tableNumber}}
            navigate('/tableNumber', params);
        })
    };
    return (<Button type={ButtonType.Info} text={"Commander"} onClick={() => nav(order)}/>);
}

function GoBackButton() {
    const navigate = useNavigate();
    const nav = () => navigate('/');
    return (<Button type={ButtonType.Danger} text={"Annuler"} onClick={nav}/>);
}

export default Ordering;
