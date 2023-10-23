export function loadData() {
    return new Promise<boolean>((resolve) => {
        console.log("Envoi de la requête de récupération des items et menus au bff")
        fetch("http://localhost:8080/menus").then((response) => response.json()).then((json) => {
            console.log("Réception des menus. Sauvegarde des données en local pour utilisation future")
            localStorage.setItem("items", JSON.stringify(json.items))
            localStorage.setItem("categoryMenu", JSON.stringify(json.categoryMenu))
            resolve(true)
        }).catch(() => {
            resolve(false)
        });
    })
}

export const getItems = (): any => {
    return JSON.parse(localStorage.getItem("items")!);
}

export const findItems = (str: string): any => {
    let items = getItems();
    let foundItems = {};
    Object.keys(items).forEach(key => {
        if (items[key].name.toLowerCase().includes(str.toLowerCase())) {
            // @ts-ignore
            foundItems[key] = items[key];
        }
    })
    return foundItems;
}

export const getMenu = (): Menu => {
    return JSON.parse(localStorage.getItem("categoryMenu")!);
}
