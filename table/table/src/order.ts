export class Order {
    [clientId: number]: OrderRecord;

    constructor(orderData: { [clientId: number]: OrderRecord }) {
        for (const clientId in orderData) {
            if (orderData.hasOwnProperty(clientId)) {
                this[clientId] = orderData[clientId];
            }
        }
    }

    get totalPrice(): number {
        let total = 0;
        for (const clientId in this) {
            if (this.hasOwnProperty(clientId)) {
                const orderRecord: OrderRecord = this[clientId];
                total += orderRecord.price;
            }
        }
        return total;
    }
    *getCustomers(): IterableIterator<[number, OrderRecord]> {
        for (const clientId in this) {
            if (this.hasOwnProperty(clientId)) {
                yield [parseInt(clientId), this[clientId]];
            }
        }
    }

    get size(): number {
        let totalQuantity = 0;
        for (const clientId in this) {
            if (this.hasOwnProperty(clientId)) {
                const orderRecord: OrderRecord = this[clientId];
                for (const itemId in orderRecord.items) {
                    if (orderRecord.items.hasOwnProperty(itemId)) {
                        totalQuantity += orderRecord.items[itemId];
                    }
                }
            }
        }
        return totalQuantity;
    }
}