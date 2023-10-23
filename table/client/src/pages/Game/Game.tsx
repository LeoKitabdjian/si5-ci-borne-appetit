import React, { FC } from 'react';
import styles from './Game.module.sass';
import {t} from "i18next";

interface GameProps {}

const Game: FC<GameProps> = () => (
  <div className={styles.Game}>
      <h2>{t('game.welcome')}</h2>
  </div>
);

export default Game;
