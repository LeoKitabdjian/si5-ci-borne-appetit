import React from 'react';
import styles from './Game.module.sass';
import {useNavigate, useSearchParams} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {getPreparations} from "../../services/PreparationService";
import PreparationItem from "../../components/PreparationItem/PreparationItem";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";

interface GameProps {
    t: any;
}

interface GameState {
    preparations: Preparations;
}

const POLL_INTERVAL = 5;
let paymentStarted = false;

function startPolling() {
    const tableId = sessionStorage.getItem('tableId');

/*
    if (tableId) {
        hasPaymentStarted(tableId).then((r) => {
            if (r === true) {
                paymentStarted = true;
                GoToPayment();
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            if (!paymentStarted) {
                setTimeout(startPolling, POLL_INTERVAL * 1000);
            }
        })
    }

 */
}

function GoToPayment() {
    const navigate = useNavigate();
    const urlParams = useSearchParams()[0].toString();
    navigate('/payment?' + urlParams);
}

class Game extends React.Component<GameProps, GameState> {

    constructor(props: GameProps) {
        super(props);
        this.state = {
            preparations: {
                ready: [],
                started: [],
            }
        };
    }

    componentDidMount() {
        startPolling();

        const tableId = sessionStorage.getItem('tableId');

        if (tableId) {
            getPreparations(tableId).then((r) => {
                this.setState({preparations: r})
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    render = () => <div className={styles.Waiting}>
        <div className={styles.Game}>
            <h2>{this.props.t('game.welcome')}</h2>
        </div>
        <div className={styles.Order}>
            <h2>{this.props.t('game.order')}</h2>

            <div>
                <h3>{this.props.t('game.ready')}</h3>
                <ul>
                    {this.state.preparations.ready.map((item, index) => (
                        <li key={index}>
                            {Object.entries(item).map(([ingredient, quantity]) => (
                                <PreparationItem id={ingredient} quantity={quantity}/>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>{this.props.t('game.started')}</h3>
                <ul>
                    {this.state.preparations.started.map((item, index) => (
                        <li key={index}>
                            {Object.entries(item).map(([ingredient, quantity]) => (
                                <PreparationItem id={ingredient} quantity={quantity}/>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
            <Button text={this.props.t('game.pay')} type={ButtonType.Primary}></Button>
        </div>
    </div>;
}

export default withTranslation()(Game)
