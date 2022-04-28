import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [isAuth, setIsAuth] = useState(false);
	const [totalData, setTotalData] = useState([]);
	const [terminated, setTerminated] = useState(0);
	const [promoted, setPromoted] = useState(0);
	const [totalNew, setTotalNew] = useState(0);
	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		const { data } = await axios.get("http://localhost:8080/employee");
		setTotalData([...totalData, ...data]);
		console.log("tesing");
	};
	const handleTerminated = (value) => {
		setTerminated(terminated + value);
	};

	const handlePromoted = (value) => {
		setPromoted(promoted + value);
	};

	const handleTotalNew = (value) => {
		setTotalNew(totalNew + value);
	};

	const handleAuth = (state) => {
		setIsAuth(state);
	};
	return (
		<AuthContext.Provider
			value={{
				isAuth,
				handleAuth,
				totalData,
				terminated,
				promoted,
				totalNew,
				handleTerminated,
				handlePromoted,
				handleTotalNew,
				setTotalData,
			}}>
			{children}
		</AuthContext.Provider>
	);
}