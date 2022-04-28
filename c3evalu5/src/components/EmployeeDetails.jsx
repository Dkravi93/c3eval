import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContextProvider";

import { useParams } from "react-router-dom";
export const EmployeeDetails = () => {
	const [userData, setUserData] = useState({ tasks: [] });

	const { id } = useParams();
	const { handleTerminated, handlePromoted } = useContext(AuthContext);

	useEffect(() => {
		getData();
	}, [id]);

	const getData = () => {
		axios.get(`http://localhost:8080/employee/${id}`).then(({ data }) => {
			setUserData({ ...userData, ...data });
			console.log("here:", data);
		});
	};

	const changeStatus = () => {
		const payload = { ...userData, status: "terminated" };
		axios.put(`http://localhost:8080/employee/${id}`, payload).then(() => {
			getData();
			handleTerminated(1);
		});
	};

	const changeTitle = () => {
		const payload = {
			...userData,
			title:
				userData.title === "intern"
					? "Jr Software Developer"
					: false || userData.title === "Jr Software Developer"
					? "Sr Software Developer"
					: false || userData.title === "Sr Software Developer"
					? "Team Lead"
					: true,
		};
		axios.put(`http://localhost:8080/employee/${id}`, payload).then(() => {
			getData();
			handlePromoted(1);
		});
	};

	console.log(userData);

	return (
		<div className="user_details">
			<img className="user_image" src={userData.image} />
			<h4 className="user_name">{userData.employee_name}</h4>
			<span className="user_salary">$ {userData.salary}</span>
			<span className="tasks">
				{userData.tasks.map((e, i) => (
					<li className="task" key={i}>
						{e}
					</li>
				))}
			</span>
			Status: <b className="status">{userData.status}</b>
			<br />
			Title: <b className="title">{userData.title}</b>
			<br />
			{
				userData.status === "terminated" ? null : (
					<button
						onClick={() => {
							changeStatus();
						}}
						className="fire">
						Fire Employee
					</button>
				)
				/* Show this button only if user is not already team lead or terminated */
			}
			<br />
			{userData.status === "terminated" ||
			userData.title === "Team Lead" ? null : (
				<button
					onClick={() => {
						changeTitle();
					}}
					className="promote">
					promote
				</button>
			)}
			{/* Show this button only if user is not already terminated (users status is working) */}
		</div>
	);
};