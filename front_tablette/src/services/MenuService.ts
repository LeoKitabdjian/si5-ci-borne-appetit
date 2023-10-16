import {findItemsFromBff, getItemsFromBff, getMenuFromBff, loadDataFromBff} from "./bff/MenuService";
import {findItemsFromServices, getItemsFromServices, getMenuFromServices, loadDataFromServices} from "./front/MenuService";

const isBff = process.env.REACT_APP_IS_BFF === 'true' ?? false;

export function loadData() {
    if (isBff) {
        return loadDataFromBff()
    } else {
        return loadDataFromServices()
    }
}

export const getItems = (): any => {
    if (isBff) {
        return getItemsFromBff()
    } else {
        return getItemsFromServices()
    }
}

export const findItems = (str: string): any => {
    if (isBff) {
        return findItemsFromBff(str);
    } else {
        return findItemsFromServices(str);
    }
}

export const getMenu = (): Menu => {
    if (isBff) {
        return getMenuFromBff();
    } else {
        return getMenuFromServices();
    }
}
