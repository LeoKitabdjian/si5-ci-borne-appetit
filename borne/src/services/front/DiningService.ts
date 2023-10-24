import {Order} from "../../order";
import {getItems} from "../MenuService";

export function sendOrderToServices(order: Order) {
    return new Promise<number>((resolve, reject) => {
        bookTable(order.customers).then((result) => {
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
        console.log("Sending GET request to get tables");
        fetch("http://localhost:9500/dining/tables")
            .then((response) => response.json())
            .then((json) => {
                findBookableTable(json, customerCount).then((result) => {
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
                console.log("Found free table, sending POST request to book table " + tableNumber);
                fetch("http://localhost:9500/dining/tableOrders", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postBody)
                }).then(r => {
                    r.json().then((json) => {
                        let toReturn = [json.tableNumber, json._id]
                        console.log("Table numéro " + toReturn[0] + ", order ID : " + toReturn[1]);
                        resolve(toReturn);
                    });
                })
                break;
            }
        }
        if (tableNumber === -1) {
            console.log("No table found");
            reject("Aucune table disponible");
        }
    });
}

function addItemsToTableOrder(order: Order, result: Array<any>) {
    let count = 0;
    for (const item of Object.entries(order.items)) {
        let shortName = getItems()[item[0]].shortName;
        let postBody = JSON.stringify({
            "menuItemId": item[0],
            "menuItemShortName": shortName,
            "howMany": item[1]
        })
        console.log("Adding item " + shortName + " * " + item[1] + " to table via POST request");
        fetch("http://localhost:9500/dining/tableOrders/" + result[1], {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: postBody
        }).then(() => {
            count++;
            if (count === Object.entries(order.items).length) {
                console.log("All items sent, sending POST request to start item preparations");
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
