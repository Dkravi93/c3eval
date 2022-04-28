import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContextProvider";

export default function PrivateRoute({ children }) {
	const { isAuth } = useContext(AuthContext);

	if (!isAuth) {
		return <Navigate to="/login" replace={false} />;
	}
	return children;
}