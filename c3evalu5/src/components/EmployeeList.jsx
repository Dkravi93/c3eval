import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const EmployeeList = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const { data } = await axios.get("http://localhost:8080/employee");

		setData(data);
	};

	console.log(data);

	return (
		<div
			className="list_container"
			style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
			{/* On clicking this card anywhere, user goes to user details */}
			{data.map((e) => (
				<Link to={`/employees/${e.id}`} key={e.id}>
					<div className="employee_card">
						<img
							className="employee_image"
							height="100px"
							width="100px"
							src={e.image}
						/>
						<br />
						<span className="employee_name">{e.employee_name}</span>
						<br />
						<span className="employee_title">{e.title}</span>
					</div>
				</Link>
			))}
		</div>
	);
};