import {Order} from "../order";

export function getOrder(tableId: string) {
    return new Promise<Order>((resolve, reject) => {
        console.log("Envoi de la requête de récupération des items et menus au bff")
        fetch("http://localhost:8080/orders/" + tableId).then((response) => response.json()).then((json) => {
            console.log("Réception des order de la table")
            resolve(new Order(json))
        }).catch(() => reject());
    })
}

export const sendOrder = (tableId: string) => new Promise<boolean>((resolve, reject) => {
    console.log("Envoi de la requête d'envoi de la commande au bff")
    fetch("http://localhost:8080/orders/send/" + tableId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then((response) => {
        console.log("Réception de la réponse de la commande")
        resolve(response.ok)
    }).catch(() => reject());
});