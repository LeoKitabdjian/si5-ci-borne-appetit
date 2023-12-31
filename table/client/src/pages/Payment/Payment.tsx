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

const POLL_INTERVAL = 3;

class PaymentWithoutHook extends React.Component<PaymentProps> {

    constructor(props: PaymentProps) {
        super(props);
        this.state = {
            preparations: {
                ready: [], started: [],
            }
        };
    }

    pollingInterval: any;

    pay() {
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

    startPolling(props: PaymentProps) {
        hasPaymentStarted().then((r) => {
            if (r === false) {
                console.log("Le paiement est terminé")
                clearInterval(this.pollingInterval);
                props.navigate('/?' + this.props.searchParams);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        const {t} = this.props;
        getClientAmount().then((result) => {
            console.log("Montant à payer", result);
            // @ts-ignore
            document.getElementById("amount").innerText = t('payment.amountToPay') + "\n" + result + "€";
        }).catch((error) => {
            console.log(error);
        })
        this.pollingInterval = setInterval(() => this.startPolling(this.props), POLL_INTERVAL * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.pollingInterval);
    }

    render() {
        const {t} = this.props;
        return <div className={styles.Payment}>
            <div id={"paymentContainer"} className={styles.paymentContainer}>
                <div id={"amount"} className={styles.Amount}></div>
                <Button onClick={this.pay} text={t('payment.pay')} type={ButtonType.Primary}/>
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
