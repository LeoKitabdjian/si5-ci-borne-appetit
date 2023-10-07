export function loadDataFromBff() {
    return new Promise<boolean>((resolve)=> {
        fetch("http://localhost:8080/menus")
            .then((response) => response.json())
            .then((json) => {
                localStorage.setItem("items", JSON.stringify(json.items))
                localStorage.setItem("categoryMenu", JSON.stringify(json.categoryMenu))
                resolve(true)
            })
            .catch(() => {
                resolve(false)
            });
    })
}

export const getItemsFromBff = (): any => {
    return JSON.parse(localStorage.getItem("items")!);
}

export const findItemsFromBff = (str: string): any => {
    let items = getItemsFromBff();
    let foundItems = {};
    Object.keys(items).forEach(key => {
        if (items[key].name.toLowerCase().includes(str.toLowerCase())) {
            // @ts-ignore
            foundItems[key] = items[key];
        }
    })
    return foundItems;
}

export const getMenuFromBff = (): Menu => {
    return JSON.parse(localStorage.getItem("categoryMenu")!);
}
