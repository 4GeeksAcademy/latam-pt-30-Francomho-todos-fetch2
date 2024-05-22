import React from "react";
import {Task} from "./Task";

//create your first component
const Home = () => {
	return (
		<div>
			<div className="general vh-100 bg-dark p-5">
				<h1 className="justify-content-center 
				align-itmes-center 
				text-center 
				text-light 
				fs-1 
				fw-lighter">todos</h1>
				<Task/>	
			</div>
		</div>


	);

};

export default Home;
