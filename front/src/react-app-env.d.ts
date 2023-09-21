/// <reference types="react-scripts" />


type OrderItem = {
    id: string;
    quantity: number;
}

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

type ItemList = {
    [key: string]: BasicItem;
}

type Category = {
    id: string;
    items: ItemList;
}

type Menu = Category[];