import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import "../../styles/index.css"

export const Task = () => {
    const [inputValue, setInputValue] = useState("");
    const [allTasks, setAllTasks] = useState([]);

    const removeTask = (id) => {
        const newTasks = allTasks.filter(item => item.id != id);
        setAllTasks(newTasks);
    };

    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/franco_mho", 
                { method: "POST" }
            );
            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
                return;
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log("Error al obtener tareas: ", error);
        }

    };
    

    const getTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/franco_mho");
            if (!response.ok) {
                console.log("Error en la solicitud: ", response)
                return;
            }
            const data = await response.json()
            setAllTasks(data.todos)
        }
        catch (error) {
            console.log("Error al obtener tareas: ", error);
        }
    };

    // const addTask = async () => {
    //     try {
    //         const response = await fetch("https://playground.4geeks.com/todo/todos/franco_mho",{
    //                 method: "POST", 
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({
    //                     label: inputValue,
    //                     is_done: false
    //                 })
    //             });
    //         if (!response.ok) {
    //             console.log("Error en la solicitud: ", response);
    //             return;
    //         }
    //         const data = await response.json();

    //         // Solo actualizamos el estado si el servidor confirma que la tarea fue agregada
    //         setAllTasks([...allTasks, data]);
    //         setInputValue("");
    //         console.log(data);

    //     } catch (error) {
    //         console.log("Error al obtener tareas: ", error);
    //     }
    // };
    const addTask = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/franco_mho", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: inputValue,
                    is_done: false
                })
            });
            if (response.ok) {
                const data = await response.json();
                setAllTasks([...allTasks, data]); // Actualizamos el estado solo si la respuesta es exitosa
                setInputValue(""); // Limpiamos el input solo si la tarea fue agregada
            } else {
                console.log("Error al agregar tarea: ", response);
            }
        } catch (error) {
            console.log("Error al agregar tarea: ", error);
        }
    };
    
    
    const deleteTask = async (id) => {
        try{
            const response = await fetch("https://playground.4geeks.com/todo/todos/" + id,{
                method: "DELETE"
            });

            // if (!response.ok) {
            //     console.log("Error en la solicitud: ", response);
            //     return;
            // }  
            // // const data = await response
            // // console.log(data);
            // // Solo eliminamos la tarea localmente si el servidor confirma que la tarea fue eliminada

            // removeTask(id);

            if (response.ok) {
                removeTask(id); // Eliminamos la tarea localmente solo si el servidor la eliminó
            } else {
                console.log("Error al eliminar tarea: ", response);
            }
        
    } catch (error) {
        console.log("Error al obtener tareas: ", error);
    }
};


const deleteAllTasks = async () => {
    try{
        const response = await fetch("https://playground.4geeks.com/todo/users/franco_mho",{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        // if (!response.ok) {
            //     console.log("Error en la solicitud: ", response);
            //     return;
            // }
            // setAllTasks([]);
            // createUser()
            if (response.ok) {
                setAllTasks([]); // Borramos todas las tareas localmente solo si el servidor las eliminó
                createUser();
            } else {
                console.log("Error al eliminar todas las tareas: ", response);
            }
        } catch (error){
            console.log("Error al eliminar todas las tareas: ", error);
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
                    setInputValue(event.target.value)
                }}
                onKeyDown={(event) => {
                    if (event.key == "Enter") {
                        addTask();
                    }
                }}

                value={inputValue}
            />
            <ul className="list-group" data-bs-theme="dark">
                {allTasks && allTasks.length > 0 && allTasks.map((task) => {
                    return (
                        <li key={task.id} 
                            className="list-group-item 
                                d-flex 
                                justify-content-between 
                                align-items-center"
                        >
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
            <button 
            onClick={deleteAllTasks} 
            className="btn btn-danger btn-sm mt-3">Reset tasks</button>
            
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