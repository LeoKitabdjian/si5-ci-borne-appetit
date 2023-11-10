/// <reference types="react-scripts" />

type ItemQuantities = { [itemId: number]: number };

type OrderRecord = {
    items: ItemQuantities; price: number;
};

type Items = {
    [key: string]: Item;
}

type Item = {
    id: string; name: string; price: number;
}

type PreparationItem = {
    [ingredient: string]: number;
};

type Preparation = PreparationItem[];

type Preparations = {
    ready: Preparation;
    started: Preparation;
};
