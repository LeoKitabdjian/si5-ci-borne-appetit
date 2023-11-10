import React from 'react';
import styles from './Table.module.sass';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Selection from "../../components/Selection/Selection";
import {getOrder, sendOrder} from "../../services/OrderService";
import {getItems} from "../../services/MenuService";
import {Order} from '../../order';
import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/ButtonType";

interface TableProps {
    t: any;
    navigate: any;
    location: any;
    searchParams: any;
}

interface TableState {
    order: Order;
    items: Items | null;
}

class TableWithoutHook extends React.Component<TableProps, TableState> {

    constructor(props: TableProps) {
        super(props);
        this.state = {
            items: null, // ou initialiser à [] ou à une valeur par défaut appropriée
            order: new Order({}), // ou initialiser à un objet vide {} ou à une valeur par défaut appropriée
        };
    }

    componentDidMount() {
        const {t} = this.props;

        // check if the tableId is present in the session storage
        let tableId = sessionStorage.getItem('tableId');
        if (!tableId) {
            tableId = this.props.searchParams.get('tableId');
        }

        if (tableId) {
            sessionStorage.setItem('tableId', tableId);
            this.props.navigate('/');
            // Utilisation de Promise.all pour attendre la fin des deux requêtes
            Promise.all([getItems(), getOrder(tableId)]).then(values => {
                const [items, order] = values;
                this.setState({
                    items: items,
                    order: order
                });
            }).catch(error => {
                // Vous pouvez choisir de naviguer vers une page d'erreur ou de gérer l'erreur ici
                console.error("An error occurred while fetching data:", error);
                this.props.navigate('/error', {state: {error: t('error.fetchingData')}});
            });

            setInterval(() => {
                // @ts-ignore
                getOrder(tableId).then(order => {
                    this.setState({
                        order: order
                    });
                }).catch(error => {
                    // Vous pouvez choisir de naviguer vers une page d'erreur ou de gérer l'erreur ici
                    console.error("An error occurred while fetching data:", error);
                    this.props.navigate('/error', {state: {error: t('error.fetchingData')}});
                });
            }, 3000);

        } else {
            this.props.navigate('/error', {state: {error: t('error.tableId')}});
        }
    }

    validate(props: Readonly<TableProps>) {
        console.log(props)
        const {t, navigate} = props;

        let tableId = sessionStorage.getItem('tableId');
        if(tableId) {
            sendOrder(tableId).then(() => {
                navigate('/game');
            }).catch(error => {
                console.error("An error occurred while sending data:", error);
                navigate('/error', {state: {error: t('error.sendingData')}});
            })
        }
    }

    render() {
        const { items, order } = this.state;
        if (!items || !order) {
            return <div className={styles.Table}>Chargement...</div>;
        }
        return <div className={styles.Table}>
            <main>
                <Selection items={items} order={order}/>
                <Button text={this.props.t("action.order")} type={ButtonType.Primary} onClick={() =>this.validate(this.props)}></Button>
            </main>
        </div>;
    }

}

function Table() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [t] = useTranslation();

    return <TableWithoutHook navigate={navigate} location={location} searchParams={searchParams} t={t}/>;
}
export default Table;
