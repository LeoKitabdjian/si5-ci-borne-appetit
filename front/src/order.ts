export class Order {
    items: { [key: string]: number }
    customers: number

    constructor() {
        this.items = {};
        this.customers = 1;
    }

    removeCustomer() {
        if (this.customers > 1) {
            this.customers -= 1;
        }
    }

    addCustomer() {
        this.customers += 1;
    }

    addItem(id: string) {
        if (this.items[id]) {
            this.items[id] += 1;
        } else {
            this.items[id] = 1;
        }
    }

    removeItem(id: string) {
        if (this.items[id]) {
            this.items[id] -= 1;

            if (this.items[id] <= 0) {
                delete this.items[id];
            }
        }
    }

    deleteItem(id: string) {
        delete this.items[id];
    }

    getQuantity(id: string): number {
        return this.items[id] || 0;
    }

    getPrice(id: string, items: Items): number {
        let total = this.items[id] * items[id].price
        return Number(total.toFixed(2));
    }

    getTotalQuantity() {
        let total = 0;
        for (const id in this.items) {
            total += this.items[id];
        }
        return total;
    }

    getTotalPrice(items: Items) {
        let total = 0;
        for (const id in this.items) {
            total += this.items[id] * items[id].price;
        }
        return Number(total.toFixed(2));
    }

}