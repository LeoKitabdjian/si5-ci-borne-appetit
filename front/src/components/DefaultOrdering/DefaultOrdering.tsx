import React from 'react';
import styles from './DefaultOrdering.module.sass';
import Category from "../Category/Category";
import ItemList from "../ItemList/ItemList";

interface DefaultOrderingProps {
    addItemToOrder: (key: string) => void;
    menu: Menu;
}

interface DefaultOrderingState {
    activeCategory: string;
}

class DefaultOrdering extends React.Component<DefaultOrderingProps, DefaultOrderingState> {

    constructor(props: DefaultOrderingProps) {
        super(props);
        this.state = {
            activeCategory: this.props.menu[0].id
        }
    }

    setCurrentCategory = (key: string) => {
        this.setState({
            activeCategory: key
        });
    }

    isActive = (id: string) => this.state.activeCategory === id;

    addItemToOrder = (key: string) => {
        this.props.addItemToOrder(key);
    }

    render() {
        return (<>
            <section className={styles.DefaultOrdering}>
                <section className={styles.Categories}>
                    {this.props.menu.map((category: any, index: number) => {
                        return <Category id={category.id}
                                         changeCategoryFunction={this.setCurrentCategory}
                                         name={category.id}
                                         isActive={this.isActive(category.id)}
                                         key={index}/>;
                    })}
                </section>
                <section>
                    {this.props.menu.map((category: any, index: number) => {
                        return <ItemList id={category.id}
                                         items={category.items}
                                         addItemToOrder={this.addItemToOrder}
                                         isActive={this.isActive(category.id)}
                                         name={category.id}
                                         key={index}/>;
                    })}
                </section>
            </section>
        </>)

    }
}

export default DefaultOrdering;
