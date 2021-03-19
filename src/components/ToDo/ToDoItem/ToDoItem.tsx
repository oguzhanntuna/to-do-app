import React from 'react';

import './ToDoItem.scss';

interface IToDo {
    id: string,
    text: string,
    isDone: boolean,
    userId: string
}
interface IToDoItemProps {
    items: {
        id: string, 
        text: string, 
        isDone: boolean,
        userId: string
    }[];
    toDoRemove: (id: string) => void;
    toDoDone: (toDo: IToDo) => void;
}

const ToDoItem: React.FC<IToDoItemProps> = (props) => {
    const toDoItems = props.items.map(toDo => {
        let isDoneCross = " toDo-list-item-text-done";

        return (
            <li className="toDo-list-item" key={toDo.id}>
                <ul className="toDo-list-item-actions">
                    <li 
                        className="toDo-list-item-actions-delete" 
                        onClick={() => props.toDoRemove(toDo.id)}>Delete</li>
                    <li>Star</li>
                    <li onClick={() => props.toDoDone(toDo)}>Done</li>
                </ul>
                <p className={`toDo-list-item-text ${toDo.isDone ? isDoneCross : ''}`}>{toDo.text}</p>
            </li>
        );
    });

    return (
        <React.Fragment>
            {toDoItems}
        </React.Fragment>
    );
}

export default ToDoItem;