export function loadData() {
    return new Promise<boolean>((resolve)=> {
        fetch("http://localhost:9500/menu/menus")
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                localStorage.setItem("menu", JSON.stringify(json))
                resolve(true)
            });
    })
}

export const getItems = (): any => {
    let items = {};
    // @ts-ignore
    let json = JSON.parse(localStorage.getItem("menu"))
    json.forEach((item: { _id: string | number; fullName: any; shortName: any; price: any; category: any; image: any; }) => {
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
    let menu: Menu = [];
    let categories = new Set<string>();
    // @ts-ignore
    let json = JSON.parse(localStorage.getItem("menu"))
    json.forEach((item: { category: string; }) => {
        categories.add(item.category);
    })
    categories.forEach(category => {
        let items: ItemList = {};
        json.forEach((item: { category: string; _id: string | number; fullName: any; price: any; image: any; }) => {
            if (item.category === category) {
                items[item._id] = {
                    name: item.fullName,
                    price: item.price,
                    image: item.image,
                };
            }
        })
        menu.push({
            id: category,
            items: items,
        })
    })
    menu.forEach(category => {
        const itemsArray = Object.entries(category.items).map(([key, item]) => ({ key, item }));

        itemsArray.sort((a, b) => {
            if (a.item.name < b.item.name) return -1;
            if (a.item.name > b.item.name) return 1;
            return 0;
        });

        let sortedItems: { [key: string]: any } = {};
        itemsArray.forEach(({ key, item }) => {
            sortedItems[key] = item;
        });
        category.items = sortedItems;
    });
    return menu;
}
