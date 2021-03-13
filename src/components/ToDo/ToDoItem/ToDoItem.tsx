import React from 'react';

import './ToDoItem.scss';

interface ToDoItemProps {
    items: {id: string, text: string}[],
    toDoRemove: (id: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = (props) => {
    const toDoItems = props.items.map(toDo => 
        <li className="toDo-list-item" key={toDo.id} onClick={() => props.toDoRemove(toDo.id)}>
            <button></button>
            <p>{toDo.text}</p>
        </li>
    );

    return (
        <React.Fragment>
            {toDoItems}
        </React.Fragment>
    );
}

export default ToDoItem;