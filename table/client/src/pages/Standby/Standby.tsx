import React from 'react';
import styles from './Standby.module.sass'
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {Trans, useTranslation} from "react-i18next";
import {loadData} from "../../services/MenuService";

const Standby = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const currentLocation = useLocation();

    const queryParams = new URLSearchParams(currentLocation.search);
    const tableId = queryParams.get('tableId');

    if (!tableId) navigate('/error')

    const gotoOrdering = () => loadData()
        .then((response) => {
            if (!response) {
                console.log("Aucune table de disponible");
                navigate('/error');
            } else {
                console.log("Au moins une table est disponible, affichage du menu...");
                navigate('/ordering');
            }
        });

    return (<div onClick={gotoOrdering} className={styles.Standby}>
        <header></header>
        <main>
            <div className={styles.title}>
                <h1>
                    <Trans i18nKey="standby.title" components={[<span />]} />
                </h1>
                <h2>{t('standby.subtitle')}</h2>
            </div>
            <Button text={t('standby.button')} type={ButtonType.Primary} isFull={true}/>
        </main>
    </div>);
};

export default Standby;
