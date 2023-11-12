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

const POLL_INTERVAL = 3;

class GameWithoutHook extends React.Component<GameProps> {

    pollingInterval: any;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            preparations: {
                ready: [], started: [],
            }
        };
    }

    startPolling(props: GameProps) {
        hasPaymentStarted().then((r) => {
            if (r === true) {
                console.log("Le paiement a commencé")
                console.log(this.props.searchParams);
                clearInterval(this.pollingInterval);
                props.navigate('/payment?' + this.props.searchParams);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.pollingInterval = setInterval(() => this.startPolling(this.props), POLL_INTERVAL * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.pollingInterval);
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
    const searchParams = useSearchParams()[0].toString();
    const [t] = useTranslation();

    return <GameWithoutHook navigate={navigate} searchParams={searchParams} t={t}/>;
}

export default Game;
