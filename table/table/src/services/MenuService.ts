export function getItems() {
    return new Promise<Items>((resolve, reject) => {
        console.log("Envoi de la requête de récupération des items et menus au bff")
        fetch("http://localhost:8080/items").then((response) => response.json()).then((json) => {
            console.log("Réception des items. Sauvegarde des données en local pour utilisation future")
            localStorage.setItem("items", JSON.stringify(json))
            resolve(json)
        }).catch(() => {
            reject();
        });
    })
}