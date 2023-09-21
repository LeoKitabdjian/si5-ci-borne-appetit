import React from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import Category from "../../components/Category/Category";
import ItemList from "../../components/ItemList/ItemList";
import {getItems, getMenu} from "../../services/MenuService";
import Selection from "../../components/Selection/Selection";

interface OrderingProps {
}

interface OrderingState {
    activeCategory: string;
    menu: Category[];
    order: OrderItem[];
}

class Ordering extends React.Component<OrderingProps, OrderingState> {

    constructor(props: OrderingProps) {
        super(props);
        let menu = getMenu();
        this.state = {
            activeCategory: menu[0].id, menu: menu, order: []
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

    setCurrentCategory = (key: string) => {
        this.setState({
            activeCategory: key
        });
    }

    isActive = (id: string) => this.state.activeCategory === id;

    render() {
        return <div className={styles.Ordering}>
            <main>
                <section>
                    <section className={styles.Categories}>
                        {this.state.menu.map((category: any, index: number) => {
                            return <Category id={category.id}
                                             changeCategoryFunction={this.setCurrentCategory}
                                             name={category.id}
                                             isActive={this.isActive(category.id)}
                                             key={index}/>
                        })}
                    </section>
                </section>
                <section>
                    {this.state.menu.map((category: any, index: number) => {
                        return <ItemList id={category.id}
                                         items={category.items}
                                         addItemToOrder={this.addItemToOrder}
                                         isActive={this.isActive(category.id)}
                                         name={category.id}
                                         key={index}/>
                    })}
                </section>

            <Selection items={getItems()} order={this.state.order}/>
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
