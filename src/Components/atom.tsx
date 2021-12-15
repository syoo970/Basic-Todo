import {atom, selector} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist();

export enum catergories {
    "To_Do" = "To_Do",
    "Doing" = "Doing",
    "Done" = "Done",
};

export interface IToDo {
    text: string;
    id: number;
    category: catergories;
};

export interface IaCats { //interface additional categories
    newCats: string;
    id: number;
};

export const CategoryState = atom<catergories>({
    key: 'Category',
    default: catergories.To_Do
});

export const AdditionalCategoryState = atom<IaCats[]>({
    key: 'AdditionalCategory',
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const toDoState = atom<IToDo[]>({
    key: 'toDos',
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const toDoSelector = selector({
    key: 'toDoSelector',
    get: ({get}) => {
        const todos = get(toDoState);
        const category = get(CategoryState);
        return todos.filter(toDo => toDo.category === category);
    }
});