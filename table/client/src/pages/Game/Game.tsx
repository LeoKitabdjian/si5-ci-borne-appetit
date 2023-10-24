import React, { FC } from 'react';
import styles from './Game.module.sass';
import {t} from "i18next";

interface GameProps {}

const POLL_INTERVAL = 5;

const Game: FC<GameProps> = () => {
    const poll = setInterval(() => {
        console.log("polling");
    }, POLL_INTERVAL * 1000);

    return <div className={styles.Game}>
        <h2>{t('game.welcome')}</h2>
    </div>
};

export default Game;
