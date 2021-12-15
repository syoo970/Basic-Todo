import React from 'react';
import { useForm } from 'react-hook-form';
import {useRecoilState, useRecoilValue} from 'recoil';
import {toDoState,catergories, toDoSelector, CategoryState ,AdditionalCategoryState} from './Components/atom';
import CreateToDo from './Components/CreateToDo'
import ToDo from './Components/ToDo';

interface ICatsForm {
    Cats: string;
}

function ToDoList() {
    const CurrToDoAry =  useRecoilValue(toDoSelector);
    const [cat,setCat] = useRecoilState(CategoryState);
    const [additionalCats,setAdditionalCats] = useRecoilState(AdditionalCategoryState);
    const {register, handleSubmit, setValue, formState:{errors} } = useForm<ICatsForm>();
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        console.log(value);
        setCat(value as catergories);
    };
    const onSubmit = (data:ICatsForm) => {
        console.log(data);
        setAdditionalCats(prevCats => [{newCats:data.Cats,id:Date.now()},...prevCats]);
        setValue('Cats', '');
    };
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <form>
                <select onInput={onInput}>
                    <option value={catergories.To_Do}>To Do</option>
                    <option value={catergories.Doing}>Doing</option>
                    <option value={catergories.Done}>Done</option>
                    {additionalCats.map(cat => <option key={cat.id} value={cat.newCats}>{cat.newCats}</option>)}
                </select>
            </form>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('Cats',{required:'뭔가 입력해 주세요!'})} placeholder='Make New Category!' />
                <button type='submit'>Make new one!</button>
            </form>
            {errors?.Cats?.message}
            <CreateToDo />
            {CurrToDoAry?.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
        </div>
    );
}

export default ToDoList;
