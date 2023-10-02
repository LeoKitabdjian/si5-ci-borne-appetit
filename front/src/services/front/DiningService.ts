import {Order} from "../../order";
import {getItems} from "../MenuService";

export function sendOrderToServices(order: Order) {
    return new Promise<number>((resolve, reject) => {
        bookTable(order.customers).then((result) => {
            console.log(result);
            resolve(result[0]);
            addItemsToTableOrder(order, result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}

function bookTable(customerCount: number) {
    return new Promise<Array<any>>((resolve, reject) => {
        fetch("http://localhost:9500/dining/tables")
            .then((response) => response.json())
            .then((json) => {
                let tables = json;
                console.log(tables)
                findBookableTable(tables, customerCount).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error)
                })
            });
    })
}

function findBookableTable(tables: any, customerCount: number) {
    return new Promise<Array<any>>((resolve, reject) => {
        let tableNumber = -1
        for (const table of tables) {
            if (!table.taken) {
                tableNumber = table.number
                let postBody = {
                    "tableNumber": tableNumber,
                    "customersCount": customerCount
                };
                fetch("http://localhost:9500/dining/tableOrders", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody)
                }).then(r => {
                    r.json().then((json) => {
                        let toReturn = [json.tableNumber, json._id]
                        console.log(toReturn);
                        resolve(toReturn);
                    });
                })
                break;
            }
        }
        if (tableNumber === -1)
            reject("Aucune table disponible");
    });
}

function addItemsToTableOrder(order: Order, result: Array<any>) {
    let count = 0;
    for (const item of Object.entries(order.items)) {
        console.log(item[0]);
        console.log(item[1]);
        let postBody = JSON.stringify({
            "menuItemId": item[0],
            "menuItemShortName": getItems()[item[0]].shortName,
            "howMany": item[1]
        })
        fetch("http://localhost:9500/dining/tableOrders/" + result[1], {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: postBody
        }).then(() => {
            count++;
            if (count === Object.entries(order.items).length) {
                fetch("http://localhost:9500/dining/tableOrders/" + result[1] + "/prepare", {
                    method: "POST",
                    body: postBody
                }).then(() => {
                    console.log("Items sent to kitchen");
                })
            }
        })
    }
}
