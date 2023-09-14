import React, {FC} from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import Category from "../../components/Category/Category";
import Item from "../../components/Item/Item";

interface OrderingProps {
}

const Ordering: FC<OrderingProps> = () => {
    const navigate = useNavigate();

    const goBack = () => navigate('/');
    const order = () => navigate('/ordering');

    const addArticle = (key: string) => {
        console.log("addArticle", key);
    }

    function randomString() {
        return Math.random().toString(36).substring(5);
    }

    function randomPrice() {
        let price = (Math.random() * 100).toFixed(2);
        return price.replace('.', ',');
    }

    return (<div className={styles.Ordering}>
        <main>
            <h1>Titre</h1>
            <section className={styles.Categories}>
                <Category/>
                <Category/>
                <Category/>
            </section>
            <h1>Titre</h1>
            <section className={styles.Items}>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
                <Item onClick={addArticle} name={"Nom de l'article"} img={"/images/example.jpg"} price={randomPrice()} id={randomString()}/>
            </section>
        </main>
        <div className={styles.Actions}>
            <Button type={ButtonType.Danger} text={"Annuler"} onClick={goBack}/>
            <Button type={ButtonType.Info} text={"Commander"} onClick={order}/>
        </div>
    </div>);
};

export default Ordering;
