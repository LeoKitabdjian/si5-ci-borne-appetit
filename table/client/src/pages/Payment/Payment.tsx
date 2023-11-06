import React, { FC } from 'react';
import styles from './Payment.module.sass';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {useTranslation} from "react-i18next";
import {getClientAmount, hasPaymentStarted, payClient} from "../../services/BillingService";
import {useNavigate, useSearchParams} from "react-router-dom";

interface PaymentProps {}

const POLL_INTERVAL = 1;

let paymentFinished = false;

function pay() {
    console.log("Paying...");
    payClient().then((r) => {
        // @ts-ignore
        document.getElementById("paymentContainer").style.display = "none";
        // @ts-ignore
        document.getElementById("paymentDone").style.display = "block";
    }).catch((error) => {

    })
}

const Payment: FC<PaymentProps> = () => {
    const navigate = useNavigate();
    const urlParams = useSearchParams()[0].toString();
    const {t} = useTranslation();
    getClientAmount().then((result) => {
        console.log("Montant à payer", result);
        // @ts-ignore
        document.getElementById("amount").innerText = t('payment.amountToPay') + " : " + result + "€";
    }).catch((error) => {
        console.log(error);
    })
    const startPolling = () => {
        return new Promise<void>((resolve, reject) => {
            hasPaymentStarted().then((r) => {
                if (r === true) {
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
    return <div className={styles.Payment}>
        <div id={"paymentContainer"} className={styles.paymentContainer}>
            <div id={"amount"}></div>
            <Button onClick={pay} text={t('payment.pay')} type={ButtonType.Primary}/>
        </div>
        <div id={"paymentDone"} className={styles.paymentDone}>{t('payment.done')}</div>
    </div>
};

export default Payment;
