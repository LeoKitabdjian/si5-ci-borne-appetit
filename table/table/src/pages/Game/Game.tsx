import React from 'react';
import styles from './Game.module.sass';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getPreparations} from "../../services/PreparationService";
import PreparationItem from "../../components/PreparationItem/PreparationItem";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {startTablePayment} from "../../services/BillingService";

interface GameProps {
    t: any;
    navigate: any;
    location: any;
    searchParams: any;
}

interface GameState {
    preparations: Preparations;
}

let tableId = sessionStorage.getItem('tableId');
if (!tableId) {
    let params = new URLSearchParams(window.location.search);
    tableId = params.get("tableId");
}

class GameWithoutHook extends React.Component<GameProps, GameState> {

    preparationInterval: any;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            preparations: {
                ready: [], started: [],
            }
        };
    }

    startPayment(props: GameProps) {
        if (tableId) {
            startTablePayment(tableId).then(() => {
                clearInterval(this.preparationInterval);
                props.navigate('/payment?' + props.searchParams);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    componentDidMount() {
        if (tableId) {
            this.preparationInterval = setInterval(() => {
                getPreparations(tableId as string).then((preparations) => {
                    this.setState({preparations: preparations});
                }).catch((error) => {
                    console.log(error);
                })
            }, 5000);
        }
    }

    render = () => <div className={styles.Waiting}>
        <div className={styles.Game}>
            <h2>{this.props.t('game.welcome')}</h2>
        </div>
        <div className={styles.Order}>
            <h2>{this.props.t('game.order')}</h2>

            <div className={styles.Items}>
                <div>
                    <h3>{this.props.t('game.ready')}</h3>
                    <ul>
                        {this.state.preparations.ready.map((item, index) => (<li key={index}>
                            {Object.entries(item).map(([ingredient, quantity]) => (
                                <PreparationItem id={ingredient} quantity={quantity}/>))}
                        </li>))}
                    </ul>
                </div>

                <div>
                    <h3>{this.props.t('game.started')}</h3>
                    <ul>
                        {this.state.preparations.started.map((item, index) => (<li key={index}>
                            {Object.entries(item).map(([ingredient, quantity]) => (
                                <PreparationItem id={ingredient} quantity={quantity}/>))}
                        </li>))}
                    </ul>
                </div>
            </div>
            <Button onClick={() => this.startPayment(this.props)} text={this.props.t('game.pay')}
                    type={ButtonType.Primary}></Button>
        </div>
    </div>;
}

function Game() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [t] = useTranslation();

    return <GameWithoutHook navigate={navigate} location={location} searchParams={searchParams} t={t}/>;
}

export default Game
