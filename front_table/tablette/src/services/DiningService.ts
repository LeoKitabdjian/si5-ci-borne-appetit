import {Order} from "../order";
import {sendOrderToBff} from "./bff/DiningService";
import {sendOrderToServices} from "./front/DiningService";

const isBff = process.env.REACT_APP_IS_BFF === 'true' ?? false;

export function sendOrder(order: Order) {
    if (isBff) {
        return sendOrderToBff(order);
    } else {
        return sendOrderToServices(order);
    }
}
