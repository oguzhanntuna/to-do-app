import React, { useRef } from 'react';

import './ToDoForm.scss';

interface ToDoInputProps {
    toDoAdd: (text: string) => void;
}

const ToDoInput: React.FC<ToDoInputProps> = (props) => {
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
            <button className="toDo-form-button">+</button>
        </form>
    );
}

export default ToDoInput;