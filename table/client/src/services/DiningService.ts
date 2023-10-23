import {Order} from "../order";

export function sendOrder(order: Order) {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<number>((resolve, reject) => {
        console.log("Envoi de la commande au bff")
        fetch("http://localhost:8080/orders/" + urlParams.get("tableId"), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then((response) => response.json()).then(result => {
            console.log(result);
            resolve(result[0]);
            //TODO save clientId
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}
