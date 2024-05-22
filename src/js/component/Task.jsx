import React, { useState} from "react";
import PropTypes from "prop-types"

export const Task = () => {
    const [inputValue, setImputValue] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [counter, setCounter] = useState(0);

    const removeTask = (indexToRemove) => {
        const newTasks = allTasks.filter((_, index) => index !== indexToRemove);
        setAllTasks(newTasks);
        setCounter(newTasks.length);
    };

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
                    if(event.key == "Enter"){
                        setAllTasks([...allTasks, {label: inputValue}])
                        setImputValue("")
                        setCounter(prev => {
                            return prev + 1
                        })
                    }
                }}
                
                value={inputValue}
                />
                <ul className="list-group" data-bs-theme="dark">
                    {allTasks && allTasks.length > 0 && allTasks.map((task, index)=>{
                        return (
                            <li key={index} className="list-group-item">
                            {task.label}
                                 <button 
                                 type="button" 
                                 className="btn-close" 
                                 aria-label="Close"
                                 onClick={() => removeTask(index)}
                                 ></button>
                            </li>
                        )
                    })}
                </ul>
                <div id="itemCounter" className="list-group 
                form-text 
                bg-secondary 
                text-light 
                p-1
                m-1 
                shadow-lg"
                >
                    COUNTER item left {counter}</div>
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
