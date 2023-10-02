import {Order} from "../../order";

export function sendOrderToBff(order: Order) {
    return new Promise<number>((resolve, reject) => {
        fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then((response) => response.json()).then(result => {
            console.log(result);
            resolve(result[0]);
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}
