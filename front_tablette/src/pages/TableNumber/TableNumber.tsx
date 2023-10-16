import React from 'react';
import styles from './TableNumber.module.sass';
import {useLocation, useNavigate} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";

const TIME_UNTIL_RETURN = 8;
const TableNumber = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const redirect = setTimeout(() => {
        navigate("/");
    }, TIME_UNTIL_RETURN * 1000);

    return <div className={styles.Content}>
        <section className={styles.TableNumber}>
            {location.state.tableNumber && <div className={styles.TableNumber}>
                <h1>
                    <Trans i18nKey="table.title" components={[<span/>]} values={{
                        number: location.state.tableNumber
                    }}/>
                </h1>
                <h2>{t('table.subtitle')}</h2>
            </div>}
            {location.state.error && <div className={styles.TableNumber}>
                <h2>{t('table.error')}</h2>
            </div>}
        </section>
    </div>
};

export default TableNumber;