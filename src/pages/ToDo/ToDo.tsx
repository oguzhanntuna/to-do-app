import React, { useState } from 'react';

import './ToDo.scss';
import ToDoInput from '../../components/ToDo/ToDoInput/ToDoInput';
import ToDoItem from '../../components/ToDo/ToDoItem/ToDoItem';

interface ToDo {
    id: string,
    text: string
}

const ToDoList: React.FC = () => {
    const [toDos, setToDos] = useState<ToDo[]>([]);

    const toDoAddHandler = (toDoText: string) => {
        if (toDoText.length !== 0) {
            setToDos([...toDos, { id: Math.random().toString(), text: toDoText }]);
        }
    }

    const toDoDeleteHandler = (toDoId: string) => {
        setToDos(toDos.filter(toDo => toDo.id !== toDoId));
    }

    return (
        <div className="toDo-content">
            <ToDoInput toDoAdd={toDoAddHandler} />
            <ul className="toDo-content-list">
                <ToDoItem items={toDos} toDoRemove={toDoDeleteHandler}/>
            </ul>
        </div>
    );
}

export default ToDoList;