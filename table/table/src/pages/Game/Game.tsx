import React, { FC } from 'react';
import styles from './Game.module.sass';
import {useNavigate, useSearchParams} from "react-router-dom";
import {hasPaymentStarted} from "../../services/BillingService";
import {useTranslation} from "react-i18next";

interface GameProps {}

const POLL_INTERVAL = 1;
let paymentStarted = false;

function startPolling() {
    const tableId = sessionStorage.getItem('tableId');
    if(tableId) {
        hasPaymentStarted(tableId).then((r) => {
            if (r === true) {
                paymentStarted = true;
                GoToPayment();
            }
        }).catch((error) => {
            console.log(error)
        }).finally(()=> {
            if (!paymentStarted) {
                setTimeout(startPolling, POLL_INTERVAL * 1000);
            }
        })
    }
}

function GoToPayment() {
    const navigate = useNavigate();
    const urlParams = useSearchParams()[0].toString();
    navigate('/payment?' + urlParams);
}

const Game: FC<GameProps> = () => {
    startPolling();
    const {t} = useTranslation();
    return <div className={styles.Game}>
        <h2>{t('game.welcome')}</h2>
    </div>
};

export default Game;
