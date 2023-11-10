import React, { FC } from 'react';
import styles from './Payment.module.sass';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {useTranslation} from "react-i18next";
import {getClientAmount, hasPaymentStarted, payClient} from "../../services/BillingService";
import {useNavigate, useSearchParams} from "react-router-dom";

interface PaymentProps {
    t: any;
    navigate: any;
    searchParams: any;
}

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
        console.log(error);
    })
}

class PaymentWithoutHook extends React.Component<PaymentProps> {

    startPolling() {
        hasPaymentStarted().then((r) => {
            if (r === false) {
                console.log("Le paiement est terminé")
                paymentFinished = true;
                this.props.navigate('/?' + this.props.searchParams);
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            if (!paymentFinished) {
                setTimeout(this.startPolling, POLL_INTERVAL * 1000);
            }
        })
    }

    componentDidMount() {
        const {t} = this.props;
        getClientAmount().then((result) => {
            console.log("Montant à payer", result);
            // @ts-ignore
            document.getElementById("amount").innerText = t('payment.amountToPay') + " : " + result + "€";
        }).catch((error) => {
            console.log(error);
        })
        this.startPolling();
    }

    render() {
        const {t} = this.props;
        return <div className={styles.Payment}>
            <div id={"paymentContainer"} className={styles.paymentContainer}>
                <div id={"amount"}></div>
                <Button onClick={pay} text={t('payment.pay')} type={ButtonType.Primary}/>
            </div>
            <div id={"paymentDone"} className={styles.paymentDone}>{t('payment.done')}</div>
        </div>
    }
}

function Payment() {
    const navigate = useNavigate();
    const searchParams = useSearchParams()[0].toString();
    const [t] = useTranslation();

    return <PaymentWithoutHook navigate={navigate} searchParams={searchParams} t={t}/>;
}

export default Payment;
