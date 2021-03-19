import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

import './ToDo.scss';
import ToDoForm from '../../components/ToDo/ToDoForm/ToDoForm';
import ToDoItem from '../../components/ToDo/ToDoItem/ToDoItem';

interface IToDo {
    id: string,
    text: string,
    userId: string
}

const ToDoPage: React.FC = () => {
    const [toDos, setToDos] = useState<IToDo[]>([]);
    const [actionTriggered, setActionTriggered] = useState<boolean>(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            let queryParams;
            queryParams = `?orderBy="userId"&equalTo="${currentUser.providerData[0].uid}"`

            axios.get('https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos.json' + queryParams)
            .then(response => {
                const  fetchedToDos = [];
                for (  let key in response.data ) {
                    fetchedToDos.push({ ...response.data[key], id: key });
                }
                setToDos(fetchedToDos);
                
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [actionTriggered, currentUser]);

    const toDoAddHandler = (toDoText: string) => {
        if (toDoText.length !== 0) {
            const toDoData = {
                id: Math.random().toString(), 
                text: toDoText, 
                userId: currentUser.providerData[0].uid 
            }
            axios.post(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos.json`, toDoData)
                .then(() => {
                    actionTriggered ? setActionTriggered(false) : setActionTriggered(true);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const toDoDeleteHandler = (toDoId: string) => {
        axios.delete(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos/${toDoId}.json`)
            .then(() => {
                actionTriggered ? setActionTriggered(false) : setActionTriggered(true);  
            })
            .catch(error => {
                console.log(error); 
            })
    }

    return (
        <div className="toDo-content">
            <ToDoForm toDoAdd={toDoAddHandler} />
            <ul className="toDo-content-list">
                <ToDoItem items={toDos} toDoRemove={toDoDeleteHandler}/>
            </ul>
        </div>
    );
}

export default ToDoPage;