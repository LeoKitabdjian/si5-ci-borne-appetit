import React, { FC } from 'react';
import styles from './Game.module.sass';
import {useNavigate, useSearchParams} from "react-router-dom";
import {hasPaymentStarted} from "../../services/BillingService";
import {useTranslation} from "react-i18next";

interface GameProps {}

const POLL_INTERVAL = 1;
let paymentStarted = false;

const Game: FC<GameProps> = () => {
    const navigate = useNavigate();
    const urlParams = useSearchParams()[0].toString();
    const startPolling = () => {
        return new Promise<void>((resolve, reject) => {
            hasPaymentStarted().then((r) => {
                if (r === true) {
                    console.log("Le paiement a commencé")
                    paymentStarted = true;
                    resolve()
                }
            }).catch((error) => {
                console.log(error)
            }).finally(()=> {
                if (!paymentStarted) {
                    setTimeout(startPolling, POLL_INTERVAL * 1000);
                }
            })
        })
    }
    startPolling().then(() => {
        navigate('/payment?' + urlParams);
    }).catch((error) => {
        console.log(error);
    })
    const {t} = useTranslation();
    return <div className={styles.Game}>
        <h2>{t('game.welcome')}</h2>
    </div>
};

export default Game;
