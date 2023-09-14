import React, { FC } from 'react';
// @ts-ignore
import styles from './Standby.style.sass';

interface StandbyProps {}

const Standby: FC<StandbyProps> = () => (
  <div className={styles.Standby}>
      Standby Page
  </div>
);

export default Standby;
