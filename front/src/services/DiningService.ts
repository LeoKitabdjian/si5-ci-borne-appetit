import {Order} from "../order";
import tableNumber from "../pages/TableNumber/TableNumber";
import {tab} from "@testing-library/user-event/dist/tab";

export function sendOrder(order: Order) {
    function getTableNumber() {
        return new Promise<number>((resolve, reject) => {
            fetch("http://localhost:9500/dining/tables")
                .then((response) => response.json())
                .then((json) => {
                    let tables = json;
                    let tableNumber = -1
                    console.log(tables)
                    for (const table of tables) {
                        if (!table.taken) {
                            tableNumber = table.number
                            let postBody = {
                                "tableNumber": tableNumber,
                                // TODO customersCount !!
                                "customersCount": 1
                            };
                            fetch("http://localhost:9500/dining/tableOrders", {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(postBody)
                            }).then(r => {
                                resolve(tableNumber)
                            })
                            break;
                        }
                    }
                    //reject();
                });
        })
    }

    return new Promise<number>((resolve, reject) => {
        console.log(order);
        getTableNumber().then((tableNumber) => {
            console.log(tableNumber);
            resolve(tableNumber);
        })
    })
}
