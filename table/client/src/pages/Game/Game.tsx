import React, { FC } from 'react';
import styles from './Game.module.sass';
import {useNavigate, useSearchParams} from "react-router-dom";
import {hasPaymentStarted} from "../../services/BillingService";
import {useTranslation} from "react-i18next";

interface GameProps {
    t: any;
    navigate: any;
    searchParams: any;
}

const POLL_INTERVAL = 1;
let paymentPolling;
let paymentStarted = true;

class GameWithoutHook extends React.Component<GameProps> {
    
    startPolling() {
        hasPaymentStarted().then((r) => {
            if (r === true) {
                console.log("Le paiement a commencé")
                paymentStarted = true;
                this.props.navigate('/payment?' + this.props.searchParams[0].toString());
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            if (!paymentStarted) {
                setTimeout(this.startPolling, POLL_INTERVAL * 1000);
            }
        })
    }

    componentDidMount() {
        this.startPolling();
    }

    render() {

        const {t} = this.props;
        return <div className={styles.Game}>
            <h2>{t('game.welcome')}</h2>
        </div>
    }
}

function Game() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [t] = useTranslation();

    return <GameWithoutHook navigate={navigate} searchParams={searchParams} t={t}/>;
}

export default Game;
