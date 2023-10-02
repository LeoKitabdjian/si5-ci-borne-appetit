import React from 'react';
import styles from './Error.module.sass';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const TIME_UNTIL_RETURN = 8;
const Error = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const redirect = setTimeout(() => {
        navigate("/");
    }, TIME_UNTIL_RETURN * 1000);

    return <div className={styles.Content}>
        <section className={styles.TableNumber}>
            <h2>{t('table.error')}</h2>
        </section>
    </div>
};

export default Error;