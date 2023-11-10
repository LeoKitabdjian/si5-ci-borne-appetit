import React, { FC } from 'react';
import styles from './Payment.module.sass';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";
import {useTranslation} from "react-i18next";
import {getTableAmount, hasPaymentStarted, payTable} from "../../services/BillingService";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {tab} from "@testing-library/user-event/dist/tab";

interface PaymentProps {
    t: any;
    navigate: any;
    location: any;
    searchParams: any;
    urlParams: any;
}

const POLL_INTERVAL = 1;

let paymentFinished = false;
let tableId = sessionStorage.getItem('tableId');
if (!tableId) {
    let params = new URLSearchParams(window.location.search);
    tableId = params.get("tableId");
}

class PaymentWithoutHook extends React.Component<PaymentProps> {

    pay() {
        console.log("Paying...");
        if (tableId) {
            payTable(tableId).then((r) => {
                // @ts-ignore
                document.getElementById("paymentContainer").style.display = "none";
                // @ts-ignore
                document.getElementById("paymentDone").style.display = "block";
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    startPaymentPolling() {
        if (tableId) {
            hasPaymentStarted(tableId).then((r) => {
                if (r === false) {
                    console.log("Le paiement est terminé")
                    paymentFinished = true;
                    this.props.navigate('/?' + this.props.urlParams);
                }
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                if (!paymentFinished) {
                    setTimeout(this.startPaymentPolling, POLL_INTERVAL * 1000);
                }
            })
        }
    }

    startAmountPolling() {
        if (tableId) {
            getTableAmount(tableId).then((result) => {
                console.log("Montant à payer", result);
                if (!paymentFinished) {
                    // @ts-ignore
                    document.getElementById("amount").innerText = t('payment.amountToPay') + " : " + result + "€";
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                if (!paymentFinished) {
                    setTimeout(this.startAmountPolling, POLL_INTERVAL * 1000);
                }
            })
        }
    }

    componentDidMount() {
        this.startPaymentPolling();
        this.startAmountPolling();
    }

    render() {
        const {t} = this.props;
        return <div className={styles.Payment}>
            <div id={"paymentContainer"} className={styles.paymentContainer}>
                <div id={"amount"}></div>
                <Button onClick={this.pay} text={t('payment.pay')} type={ButtonType.Primary}/>
            </div>
            <div id={"paymentDone"} className={styles.paymentDone}>{t('payment.done')}</div>
        </div>
    }

}

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const urlParams = useSearchParams()[0].toString();
    const [t] = useTranslation();

    return <PaymentWithoutHook navigate={navigate} location={location} searchParams={searchParams} t={t} urlParams={urlParams}/>;
}

export default Payment;
