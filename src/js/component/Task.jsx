import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import "../../styles/index.css"

export const Task = () => {
    const [inputValue, setImputValue] = useState("");
    const [allTasks, setAllTasks] = useState([]);

    const removeTask = (id) => {
        const newTasks = allTasks.filter(item => item.id != id);
        setAllTasks(newTasks);
    };
    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/franco_mho", 
                { method: "POST" }
            )
            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
                return null
            }
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log("Error al obtener tareas: ", error);
        }

    };
    

    const getTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/franco_mho")
            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
            }
            const data = await response.json()
            setAllTasks(data.todos)

        }
        catch (error) {
            console.log("Error al obtener tareas: ", error);
        }
    };

    const addTask = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/franco_mho",
                {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        label: inputValue,
                        is_done: false
                    })
                }
            )
            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
                return null;
            }
            const data = await response.json()
            setAllTasks([...allTasks, data]);
            setImputValue("");

        } catch (error) {
            console.log("Error al obtener tareas: ", error);
        }
    };
    
    
    const deleteTask = async (id) => {
        try{
            const response = await fetch("https://playground.4geeks.com/todo/todos/" + id,
            {method: "DELETE"})

            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
                return null;
            }  
            const data = await response
            console.log(data)
            removeTask(id)
        
    } catch (error) {
        console.log("Error al obtener tareas: ", error);
    }
};


    useEffect(() => {
        createUser()
        getTasks()
    }, []);

    return (
        <div className="mb-3">
            <input type="text"
                className="form-control text-darkt bg-light"
                id="singleTask"
                placeholder="Add your Task"
                onChange={(event) => {
                    setImputValue(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key == "Enter") {
                        addTask()
                    }
                }}

                value={inputValue}
            />
            <ul className="list-group" data-bs-theme="dark">
                {allTasks && allTasks.length > 0 && allTasks.map((task) => {
                    return (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {task.label}
                            <button
                                className="btn btn-danger btn-sm visible"
                                aria-label="Close"
                                onClick={() => deleteTask(task.id)}
                            >x</button>
                        </li>
                    )
                })}
            </ul>
            <div id="itemCounter" className="list-group 
                form-text 
                bg-secondary 
                text-light 
                m-1 
                shadow-lg"
            >
                <div className="d-flex justify-content-center">
                    {allTasks.length} tasks left</div>
            </div>
            
        </div>
    )

};


// si o si - el largo del arrray mayor a cero. hacemos map
//cuando preione agrego la tare. lo identificas en onKEy - al preeionar agregas relemento
//preguntarme desde el evento 

//Si la tecla que se preiona es Enter
//Entonces vamos a agregar lo que esta ne el imput dentor de all tasks
//Sin eliminar lo anterior manteniendo lo previo
//Si no limpiamos -set imput value=""

//	allTasks.map((task) =>{
//    return {Task}
//boton eliminar - herramienta especifica -que accion hacer cuando click x .filter

//agregar tarea POST