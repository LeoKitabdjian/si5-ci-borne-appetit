import {tab} from "@testing-library/user-event/dist/tab";

export function loadDataFromServices() {
    return new Promise<boolean>((resolve) => {
        fetch("http://localhost:9500/dining/tables").then((response) => response.json()).then((json) => {
            let tableAvailable = false;
            for (const table of json) {
                console.log(table.taken);
                if (!table.taken) {
                    tableAvailable = true;
                    fetch("http://localhost:9500/menu/menus")
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json)
                            const menu = parseMenu(json);
                            localStorage.setItem("menu", JSON.stringify(menu))
                            const items = parseItems(json);
                            localStorage.setItem("items", JSON.stringify(items))
                            resolve(true)
                        });
                    break;
                }
            }
            if (!tableAvailable) {
                resolve(false);
            }
        })
    })
}

export const getItemsFromServices = (): Items => {
    let items = localStorage.getItem("items")
    return items ? JSON.parse(items) : {};
}

export const getMenuFromServices = (): Menu => {
    let menu = localStorage.getItem("menu")
    return menu ? JSON.parse(menu) : {};
}


const parseItems = (json: any): Items => {
    let items = {};
    json.forEach((item: {
        _id: string | number; fullName: any; shortName: any; price: any; category: any; image: any;
    }) => {
        // @ts-ignore
        items[item._id] = {
            name: item.fullName,
            shortName: item.shortName,
            price: item.price,
            category: item.category,
            image: item.image,
        };
    })
    return items;
}

export const findItemsFromServices = (str: string): Items => {
    const items: Items = getItemsFromServices();
    const foundItems: Items = {};

    Object.keys(items).forEach(key => {
        if (items[key].name.toLowerCase().includes(str.toLowerCase())) {
            foundItems[key] = items[key];
        }
    });

    return foundItems;
};

const parseMenu = (json: any): Menu => {
    let menu: Menu = [];
    let categories = new Set<string>();
    json.forEach((item: { category: string; }) => {
        categories.add(item.category);
    })
    categories.forEach(category => {
        let items: CategoryItems = {};
        json.forEach((item: { category: string; _id: string | number; fullName: any; price: any; image: any; }) => {
            if (item.category === category) {
                items[item._id] = {
                    name: item.fullName, price: item.price, image: item.image
                };
            }
        })
        menu.push({
            id: category, items: items,
        })
    })
    menu.forEach(category => {
        const sortedItemsArray = Object.entries(category.items)
            .sort(([, itemA], [, itemB]) => itemA.name.localeCompare(itemB.name));

        category.items = Object.fromEntries(sortedItemsArray);
    });

    return menu;
}
