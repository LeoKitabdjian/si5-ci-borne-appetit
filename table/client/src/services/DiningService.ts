import {Order} from "../order";

const isBff = process.env.REACT_APP_IS_BFF === 'true' ?? false;

export function sendOrder(order: Order) {
    return new Promise<number>((resolve, reject) => {
        console.log("Envoi de la commande au bff")
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
