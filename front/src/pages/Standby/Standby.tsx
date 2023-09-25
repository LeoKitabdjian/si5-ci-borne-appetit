import React from 'react';
import styles from './Standby.module.sass'
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {Trans, useTranslation, withTranslation} from "react-i18next";


const Standby = () => {
    const {t} = useTranslation();
    console.log(t)
    const navigate = useNavigate();

    const gotoOrdering = () => navigate('/ordering');

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
