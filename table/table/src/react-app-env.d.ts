/// <reference types="react-scripts" />

type ItemQuantities = { [itemId: number]: number };

type OrderRecord = {
    items: ItemQuantities;
    price: number;
};

type Items = {
    [key: string]: Item;
}

type Item = {
    name: string;
    price: number;
    image: string;
    shortName: string;
    category: string;
}




