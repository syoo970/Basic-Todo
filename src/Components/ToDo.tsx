import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState,catergories, AdditionalCategoryState } from "./atom";

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const Acats = useRecoilValue(AdditionalCategoryState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event;
        setToDos(prevTodo => {
           const targetIdx = prevTodo.findIndex(todo => todo.id === id);
           const newTodo:IToDo = {text,id, category: name as catergories};
           const newTodos = [...prevTodo];
           newTodos.splice(targetIdx, 1, newTodo);
           return newTodos;
        });
    };

    return (
        <li>
            {text}
            {category !== catergories.Doing && <button name={catergories.Doing} onClick={onClick}>Doing</button>}
            {category !== catergories.To_Do && <button name={catergories.To_Do} onClick={onClick}>To_Do</button>}
            {category !== catergories.Done && <button name={catergories.Done} onClick={onClick}>Done</button>}
            {Acats.map(cat => {
                return category !== cat.newCats && <button key={cat.id} name={cat.newCats} onClick={onClick}>{cat.newCats}</button>
            })}
        </li>
    )
}

export default ToDo;
