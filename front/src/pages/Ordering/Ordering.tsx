import React from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import Category from "../../components/Category/Category";
import ItemList from "../../components/ItemList/ItemList";
import {getMenu} from "../../services/MenuService";

interface OrderingProps {
}

interface OrderingState {
    activeCategory: string;
    menu: any;
}

class Ordering extends React.Component<OrderingProps, OrderingState> {

    constructor(props: OrderingProps) {
        super(props);
        let menu = getMenu();
        this.state = {
            activeCategory: menu[0].id,
            menu: menu
        }
    }

    addItemToOrder = (key: string) => {
        console.log("addArticle", key);
    }

    setCurrentCategory = (key: string) => {
        this.setState({
            activeCategory: key
        });
    }

    isActive(id: string) {
        return this.state.activeCategory === id;
    }

    render() {
        return (<div className={styles.Ordering}>
            <main>
                <h1><span>Catégories</span></h1>
                <section className={styles.Categories}>
                    {this.state.menu.map((category: any, index: number) => <Category id={category.id}
                                                                                     changeCategoryFunction={this.setCurrentCategory}
                                                                                     name={category.id}
                                                                                     isActive={this.isActive(category.id)}
                                                                                     key={index}/>)}
                </section>
                <section className={styles.ItemList}>
                    {this.state.menu.map((category: any, index: number) => <ItemList id={category.id}
                                                                                     items={category.items}
                                                                                     addItemToOrder={this.addItemToOrder}
                                                                                     isActive={this.isActive(category.id)}
                                                                                     name={category.id}
                                                                                     key={index}/>)}
                </section>
            </main>
            <div className={styles.Actions}>
                <GoBackButton/>
                <OrderButton/>
            </div>
        </div>);
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
