import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
	const initial = {
		email: "",
		password: "",
	};
	const { handleAuth, isAuth } = useContext(AuthContext);
	const [formData, setFormData] = useState(initial);

	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) {
			navigate(-1, { replace: true });
		}
	}, [isAuth]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// console.log(isAuth);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				"https://reqres.in/api/login",
				formData
			);
			handleAuth(data.token);
		} catch (error) {
			console.log("error:", error);
		}
	};

	return (
		<form className="loginform" onSubmit={handleSubmit}>
			<input
				onChange={handleChange}
				name="username"
				type="text"
				placeholder="Enter username"
				className="login_username"
			/>
			<input
				onChange={handleChange}
				name="password"
				type="text"
				placeholder="Enter password"
				className="login_password"
			/>
			<input type="submit" value="SIGN IN" className="login_submit" />
		</form>
	);
}