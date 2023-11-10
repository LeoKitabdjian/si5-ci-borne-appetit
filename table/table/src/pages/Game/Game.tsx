import React, { FC } from 'react';
import styles from './Game.module.sass';
import {useNavigate, useSearchParams} from "react-router-dom";
import {hasPaymentStarted} from "../../services/BillingService";
import {useTranslation, withTranslation} from "react-i18next";

interface GameProps {
    t: any;
}

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

class Game extends React.Component<GameProps> {
    componentDidMount() {
        startPolling();
    }

    render = () => <div className={styles.Waiting}>
        <div className={styles.Game}>
            <h2>{this.props.t('game.welcome')}</h2>
        </div>
        <div className={styles.Order}>
            <h2>{this.props.t('game.order')}</h2>
        </div>
    </div>;
}

export default withTranslation()(Game)
