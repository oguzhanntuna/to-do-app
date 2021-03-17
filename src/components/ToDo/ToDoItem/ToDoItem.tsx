import React from 'react';

import './ToDoItem.scss';

interface ToDoItemProps {
    items: {id: string, text: string}[],
    toDoRemove: (id: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = (props) => {
    const toDoItems = props.items.map(toDo => 
        <li className="toDo-list-item" key={toDo.id}>
            <ul className="toDo-list-item-actions">
                <li 
                    className="toDo-list-item-actions-delete" 
                    onClick={() => props.toDoRemove(toDo.id)}>Delete</li>
                <li>Star</li>
                <li>Edit?</li>
            </ul>
            <p className="toDo-list-item-text">{toDo.text}</p>
        </li>
    );

    return (
        <React.Fragment>
            {toDoItems}
        </React.Fragment>
    );
}

export default ToDoItem;