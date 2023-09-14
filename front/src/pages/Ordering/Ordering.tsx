import React, {FC} from 'react';
import styles from './Ordering.module.sass';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";

interface OrderingProps {
}

const Ordering: FC<OrderingProps> = () => {
    const navigate = useNavigate();

    const goBack = () => navigate('/');
    const order = () => navigate('/ordering');

    return (<div className={styles.Ordering}>
            Ordering Page
            <div className={styles.action}>
                <Button type={ButtonType.Danger} text={"Annuler"} onClick={goBack}/>
                <Button type={ButtonType.Info} text={"Commander"} onClick={order}/>
            </div>
        </div>);
};

export default Ordering;
