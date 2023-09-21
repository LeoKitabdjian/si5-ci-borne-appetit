import React, { FC } from 'react';
import styles from './Order.module.sass';

interface OrderProps {
}

interface OrderState {

}

const Order: FC<OrderProps> = () => (
  <div className={styles.Order}>
      Order Page
  </div>
);

export default Order;
