import React, { FC } from 'react';
import styles from './Payment.module.sass';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {useTranslation} from "react-i18next";
import {hasPaymentStarted, payClient} from "../../services/BillingService";
import {useNavigate, useSearchParams} from "react-router-dom";

interface PaymentProps {}

const POLL_INTERVAL = 1;

let paymentFinished = false;

function pay() {
    console.log("Paying...");
    //TODO enlever le bouton et afficher la div "paiement effectué"
    payClient().then((r) => {

    }).catch((error) => {

    })
}

const Payment: FC<PaymentProps> = () => {
    const navigate = useNavigate();
    const urlParams = useSearchParams()[0].toString();
    const startPolling = () => {
        return new Promise<void>((resolve, reject) => {
            hasPaymentStarted().then((r) => {
                if (r === false) {
                    console.log("Le paiement est terminé")
                    paymentFinished = true;
                    resolve();
                }
            }).catch((error) => {
                console.log(error)
            }).finally(()=> {
                if (!paymentFinished) {
                    setTimeout(startPolling, POLL_INTERVAL * 1000);
                }
            })
        })
    }
    startPolling().then(() => {
        navigate('/?' + urlParams);
    }).catch((error) => {
        console.log(error);
    })
    const {t} = useTranslation();
    return <div className={styles.Payment}>
        <Button onClick={pay} text={t('payment.pay')} type={ButtonType.Primary}/>
        <div className={styles.paymentDone}>{t('payment.done')}</div>
    </div>
};

export default Payment;
