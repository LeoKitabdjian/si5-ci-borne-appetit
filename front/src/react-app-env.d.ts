/// <reference types="react-scripts" />
type Menu = Category[];

type Category = {
    id: string;
    items: CategoryItems;
}

type CategoryItems = {
    [key: string]: ItemInCategory;
}

type ItemInCategory = {
    name: string;
    price: number;
    image: number;
}

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




