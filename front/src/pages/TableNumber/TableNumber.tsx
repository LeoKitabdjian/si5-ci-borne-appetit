import React, { FC } from 'react';
import styles from './TableNumber.module.sass';
import {useLocation, useNavigate} from "react-router-dom";

const TIME_UNTIL_RETURN = 3;

interface TableNumberProps {
}

const TableNumber: FC<TableNumberProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();

    setTimeout(() => {
        navigate("/");
    }, TIME_UNTIL_RETURN * 1000);

    return (<div className={styles.TableNumber}>
        {location.state.message}
    </div>)
};

export default TableNumber;
