import React from 'react';

import './ToDoItem.scss';
import Remove from '../../../icons/cross.svg';
import Done from '../../../icons/done.svg';
import Pin from '../../../icons/pin.svg';

interface IToDo {
    id: string;
    text: string;
    userId: string;
    isDone: boolean;
    isPinned: boolean;
}
interface IToDoItemProps {
    items: IToDo[];
    toDoRemove: (id: string) => void;
    toDoDone: (toDo: IToDo) => void;
    toDoPinned: (toDo: IToDo) => void;
}

const ToDoItem: React.FC<IToDoItemProps> = (props) => {
    const toDoItems = props.items.map(toDo => {
        let isPinned = "toDo-list-item-pinned";
        let isDoneCross = " toDo-list-item-text-done";

        return (
            <li className={`toDo-list-item ${toDo.isPinned ? isPinned : null}`} key={toDo.id}>
                <ul className="toDo-list-item-actions">
                    <li className="toDo-list-item-actions-delete" 
                        onClick={() => props.toDoRemove(toDo.id)}>
                        <img src={Remove} alt="remove-icon" />
                    </li>
                    <li className="toDo-list-item-actions-star"
                        onClick={() => props.toDoPinned(toDo)}>
                        <img src={Pin} alt="star-icon" />
                    </li>
                    <li className="toDo-list-item-actions-done"
                        onClick={() => props.toDoDone(toDo)}>
                        <img src={Done} alt="done-icon" /> 
                    </li>
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