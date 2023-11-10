import React, { FC } from 'react';
import styles from './Payment.module.sass';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {useTranslation} from "react-i18next";
import {payClient} from "../../services/BillingService";

interface PaymentProps {}

function pay() {
    console.log("Paying...");
    payClient().then((r) => {

    }).catch((error) => {
        
    })
}

const Payment: FC<PaymentProps> = () => {
    const {t} = useTranslation();
    return <div className={styles.Payment}>
        <Button onClick={pay} text={t('payment.pay')} type={ButtonType.Primary}/>
    </div>
};

export default Payment;
