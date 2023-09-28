import {Order} from "../order";
import {getItems} from "./MenuService";

export function sendOrder(order: Order) {
    return new Promise<number>((resolve, reject) => {
        console.log(order);
        bookTable().then((result) => {
            console.log(result);
            resolve(result[0]);
            addItemsToTableOrder(order, result);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}

function bookTable() {
    return new Promise<Array<any>>((resolve, reject) => {
        fetch("http://localhost:9500/dining/tables")
            .then((response) => response.json())
            .then((json) => {
                let tables = json;
                console.log(tables)
                findBookableTable(tables).then((result) => {
                    resolve(result)
                }).catch((error) => {
                    reject(error)
                })
            });
    })
}

function findBookableTable(tables: any) {
    return new Promise<Array<any>>((resolve, reject) => {
        let tableNumber = -1
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
        })
    }
}
