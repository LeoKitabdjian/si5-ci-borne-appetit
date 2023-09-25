import React, {FC} from 'react';
import styles from './Standby.module.sass'
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {loadData} from "../../services/MenuService";

interface StandbyProps {
}

const Standby: FC<StandbyProps> = () => {
    const navigate = useNavigate();

    const gotoOrdering = () => {

        loadData().then(() => {
                navigate('/ordering');
            }
        )

    };

    return (<div onClick={gotoOrdering} className={styles.Standby}>
        <header></header>
        <main>
            <div className={styles.title}>
                <h1>Bienvenue chez <span>Borne'Appétit</span></h1>
                <h2>La solution numéro 1 pour gérer vos services de commande via des bornes !</h2>
            </div>
            <Button text={"Appuyer n'importe où sur l'écran pour commander"} type={ButtonType.Primary} isFull={true}/>
        </main>
    </div>);
};

export default Standby;
