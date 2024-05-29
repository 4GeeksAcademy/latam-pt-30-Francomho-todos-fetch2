import React from "react";
import {Task} from "./Task";

//create your first component
const Home = () => {
	//const [createUser, setCreateUser] = useStaate([])
	


	return (
		<div>
			<div className="general vh-100 bg-dark p-5">
				<h1 className="h1 justify-content-center 
				align-itmes-center 
				text-center 
				text-light 
				fw-lighter">todos</h1>
				
					<Task
					/>	
			</div>
		</div>


);

};








// 	const deleteTasks = async () => {
// 		try {
// 			const response = await fetch("https://playground.4geeks.com/todo/todos/franco_mho")
// 			if (response.status != 200){
// 				console.log("Error en la solicitud: ", response)
// 				return null
// 			}
// 			const data = await response.json()
// 			console.log(data.results)
// 		} catch (error){
// 		}
// 	}
// 	deleteTasks()




export default Home;


//hacer post de tareas 
//acceder a tareas de usuario con get
//post usuario - 

//AL TENER VAIROS TODOS CREADOS E¿NIICAMOS CON EL GET
//1 que esten todas las tareas GET -user name-
//2 post -todos user.name 
//3 delete todo-list
//4 boton elimina todas las tareas - Delete user-name
//5 crear usuario 
//TUNDER CLIENT