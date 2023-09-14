import React, { FC } from 'react';
// @ts-ignore
import styles from './Ordering.style.sass';

interface OrderingProps {}

const Ordering: FC<OrderingProps> = () => (
  <div className={styles.Ordering}>
      Ordering Page
  </div>
);

export default Ordering;
