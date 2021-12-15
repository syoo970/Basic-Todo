import {useForm} from 'react-hook-form';
import {useRecoilState, useRecoilValue} from 'recoil';
import { toDoState, CategoryState } from './atom';

interface ItodoForm {
    toDo: string;
}

function CreateToDo() {
    const {register, handleSubmit, setValue } = useForm<ItodoForm>();
    const [ToDos, setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(CategoryState);
    const onValid = (data:ItodoForm) => {
        setToDos(prevTodo => [{text:data.toDo, id:Date.now(), category},...prevTodo]);
        setValue('toDo', '');
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required:"ToDo를 적어주세요!",minLength:{value: 1, message:"두자리 이상 적어주세요!"}})}
                placeholder='ToDo 적기!' />
                <button type='submit'>추가</button>
            </form>
        </div>
    )
}

export default CreateToDo;
