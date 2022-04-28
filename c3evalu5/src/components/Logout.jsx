import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContextProvider";

export const Logout = () => {
	const { isAuth, handleAuth } = useContext(AuthContext);
	// log user out. it's just an inmemory value in context api
	const navigate = useNavigate();
	return (
		<div>
			<button
				onClick={() => {
					handleAuth(!isAuth);
					navigate("/");
				}}>
				LogOut
			</button>
		</div>
	);
};