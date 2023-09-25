/// <reference types="react-scripts" />



type Items = {
    [key: string]: VeryBasicItem;
}

type VeryBasicItem = {
    name: string;
    price: number;
}

type BasicItem = {
    name: string;
    price: number;
    image: string;
}

type CategorisedItem = {
    name: string;
    price: number;
    image: string;
    category: string;
}

type ItemList = {
    [key: string]: BasicItem;
}

type Category = {
    id: string;
    items: ItemList;
}

type Menu = Category[];

type OrderItem = {
    [key: string]: number;
}

