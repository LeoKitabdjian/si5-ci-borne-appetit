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