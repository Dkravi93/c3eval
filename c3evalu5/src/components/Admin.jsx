import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContextProvider";

export const Admin = () => {
	const initial = {
		employee_name: "",
		employee_id: "",
		title: "",
		salary: "",
		image: "",
		username: "",
		password: "",
		tasks: [],
		status: "",
		team: "",
	};

	const [formData, setFormData] = useState(initial);

	const { handleTotalNew, setTotalData } = useContext(AuthContext);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { data } = await axios.get("http://localhost:8080/employee");

		setTotalData([...data]);
	};

	const handleChange = (e) => {
		const { value, name } = e.target;
		setFormData({
			...formData,
			[name]: name === "tasks" ? [value.trim().split(",")] : value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:8080/employee", formData);
		setFormData({
			employee_name: "",
			employee_id: "",
			title: "",
			salary: "",
			image: "",
			username: "",
			password: "",
			tasks: [],
			status: "",
			team: "",
		});
		getData();
		handleTotalNew(1);
	};
	return (
		<form className="createEmployee" onSubmit={handleSubmit}>
			<input
				type="text"
				value={formData.employee_name}
				onChange={handleChange}
				placeholder="Employee Name"
				name="employee_name"
				required
			/>
			<input
				type="text"
				value={formData.employee_id}
				onChange={handleChange}
				placeholder="Employee id"
				name="employee_id"
				required
			/>
			<select
				required
				name="title"
				onChange={handleChange}
				value={formData.title}>
				<option value="intern">Intern</option>
				<option value="Jr Software Developer">Jr Software Developer</option>
				<option value="Sr Software Developer">Sr Software Developer</option>
				<option value="Team Lead">Team Lead</option>
			</select>
			<input
				required
				type="number"
				value={formData.salary}
				onChange={handleChange}
				placeholder="Salary"
				name="salary"
			/>
			<input
				required
				type="text"
				value={formData.image}
				onChange={handleChange}
				placeholder="Image"
				name="image"
			/>
			<input
				required
				type="text"
				value={formData.username}
				onChange={handleChange}
				placeholder="User Name"
				name="username"
			/>
			<input
				required
				type="password"
				value={formData.password}
				onChange={handleChange}
				placeholder="Password"
				name="password"
			/>
			<input
				required
				type="text"
				value={formData.tasks}
				onChange={handleChange}
				placeholder="Enter tasks separated by commas"
				name="tasks"
			/>
			<select
				required
				value={formData.status}
				name="status"
				id="status"
				onChange={handleChange}>
				<option value="">Select Status</option>
				<option value="terminated">Terminated</option>
				<option value="working">Working</option>
			</select>
			<select
				required
				name="team"
				value={formData.team}
				id="team"
				onChange={handleChange}>
				<option value="">Select team</option>
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
				<option value="qa">QA</option>
			</select>
			<input className="createUser" type="submit" value={"submit"} />
		</form>
	);
};