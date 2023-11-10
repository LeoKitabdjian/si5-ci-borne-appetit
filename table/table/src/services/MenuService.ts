export function getItems() {
    return new Promise<Items>((resolve, reject) => {
        console.log("Envoi de la requête de récupération des items au bff")
        fetch("http://localhost:8080/menus/items").then((response) => response.json()).then((json) => {
            console.log("Réception des items")
            localStorage.setItem("items", JSON.stringify(json))
            resolve(json)
        }).catch(() => {
            reject();
        });
    })
}