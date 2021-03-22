import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

import './ToDo.scss';
import ToDoForm from '../../components/ToDo/ToDoForm/ToDoForm';
import ToDoItem from '../../components/ToDo/ToDoItem/ToDoItem';

interface IToDo {
    id: string;
    text: string;
    userId: string;
    isDone: boolean;
    isPinned: boolean;
}

const ToDoPage: React.FC = () => {
    const [toDos, setToDos] = useState<IToDo[]>([]);
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            let queryParams;
            queryParams = `?orderBy="userId"&equalTo="${currentUser.providerData[0].uid}"`

            axios.get('https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos.json' + queryParams)
            .then(response => {
                //console.log(response)
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
    }, [currentUser, fetchTrigger]);

    const toDoAddHandler = (toDoText: string) => {
        if (toDoText.length !== 0) {
            const toDoData: IToDo = {
                id: Math.random().toString(),
                text: toDoText, 
                userId: currentUser.providerData[0].uid,
                isDone: false,
                isPinned: false
            }
            axios.post(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos.json`, toDoData)
                .then((response) => {
                    setToDos([...toDos, {...toDoData, id: response.data.name}]);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const toDoDeleteHandler = (toDoId: string) => {
        axios.delete(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos/${toDoId}.json`)
            .then(() => {
                setToDos(toDos.filter(toDos => toDos.id !== toDoId));
            })
            .catch(error => {
                console.log(error); 
            })
    }

    const toDoDoneHandler = (toDo: IToDo) => {
        const toDoData: IToDo = {
            id: toDo.id,
            text: toDo.text, 
            userId: toDo.userId,
            isDone: !toDo.isDone ? true : false,
            isPinned: false
        }
        axios.put(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos/${toDo.id}.json`, toDoData )
            .then(() => {
                !fetchTrigger ? setFetchTrigger(true) : setFetchTrigger(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const toDoPinnedHandler = (toDo: IToDo) => {
        const toDoData: IToDo = {
            id: toDo.id,
            text: toDo.text, 
            userId: toDo.userId,
            isDone: false,
            isPinned: !toDo.isPinned ? true : false,
        }
        axios.put(`https://to-do-app-aa457-default-rtdb.europe-west1.firebasedatabase.app/toDos/${toDo.id}.json`, toDoData )
            .then(() => {
                !fetchTrigger ? setFetchTrigger(true) : setFetchTrigger(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="toDo-content">
            <ToDoForm toDoAdd={toDoAddHandler} />
            <ul className="toDo-content-list">
                <ToDoItem items={toDos} toDoRemove={toDoDeleteHandler} toDoDone={toDoDoneHandler} toDoPinned={toDoPinnedHandler}/>
            </ul>
        </div>
    );
}

export default ToDoPage;