import {Order} from "../order";

export function sendOrder(order: Order) {
    const urlParams = new URLSearchParams(window.location.search);
    return new Promise<void>((resolve, reject) => {
        console.log("Envoi de la commande au bff")
        fetch("http://localhost:8080/orders/" + urlParams.get("tableId"), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then((response) => response.json()).then(result => {
            console.log(result);
            //TODO save clientId
            resolve();
        }).catch((error) => {
            console.log(error);
            reject(error)
        })
    })
}
