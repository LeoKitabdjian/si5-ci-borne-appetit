export class Order {
    private clientIds: number[]; // Tableau pour stocker les IDs des clients.
    [clientId: number]: OrderRecord; // Index signature pour les commandes des clients.

    constructor(orderData: { [clientId: number]: OrderRecord }) {
        this.clientIds = []; // Initialisation du tableau des IDs clients.
        for (const clientId in orderData) {
            if (orderData.hasOwnProperty(clientId)) {
                this[clientId] = orderData[clientId];
                this.clientIds.push(parseInt(clientId, 10)); // Ajout de l'ID client au tableau.
            }
        }
    }

    get totalPrice(): number {
        return this.clientIds.reduce((total, clientId) => total + this[clientId].price, 0);
    }

    get size(): number {
        return this.clientIds.reduce((totalQuantity, clientId) => {
            const orderRecord = this[clientId];
            for (const itemId in orderRecord.items) {
                if (orderRecord.items.hasOwnProperty(itemId)) {
                    totalQuantity += orderRecord.items[itemId];
                }
            }
            return totalQuantity;
        }, 0);
    }

    getPrice(id: string, q: number, items: Items): number {
        let total = q * items[id].price;
        return Number(total.toFixed(2));
    }

    // Vous pouvez maintenant avoir une méthode pour accéder à l'attribut clientIds.
    getClientIds(): number[] {
        return this.clientIds;
    }
}
