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

    size() {
        return Object.values(this.items).reduce((total, currentValue) => total + currentValue, 0);
    }

    getTotalPrice(items: Items) {
        const total = Object.keys(this.items).reduce((sum, id) => {
            return sum + (this.items[id] * (items[id]?.price || 0));
        }, 0);

        return Number(total.toFixed(2));
    }

}