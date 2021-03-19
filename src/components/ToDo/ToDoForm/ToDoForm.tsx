import React, { useRef } from 'react';

import './ToDoForm.scss';
import AddSVG from '../../../icons/add-white-24dp.svg';

interface IToDoFormProps {
    toDoAdd: (text: string) => void;
}

const ToDoInput: React.FC<IToDoFormProps> = (props) => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const toDoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredInput = textInputRef.current!.value;
        props.toDoAdd(enteredInput);
        textInputRef.current!.value = '';
    }

    return (
        <form className="toDo-form" onSubmit={toDoSubmitHandler}>
            <input 
                className="toDo-form-input" 
                type="text"
                placeholder="Add a to-do"
                ref={textInputRef}></input>
            <button className="toDo-form-button">
                <img src={AddSVG} alt="add-black-48dp" />     
            </button>
        </form>
    );
}

export default ToDoInput;