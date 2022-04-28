import { Home } from "./components/Home";
import Login from "./components/Login";

import { EmployeeList } from "./components/EmployeeList";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { Admin } from "./components/Admin";
import { Navbar } from "./components/Navbar";
import { Logout } from "./components/Logout";
import { Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				{/* Routes here */}
				<Route path="/" element={<Home />} />

				<Route exact path="/employees" element={<EmployeeList />} />
				<Route
					exact
					path="/employees/:id"
					element={
						<PrivateRoute>
							<EmployeeDetails />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/admin"
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/logout" element={<Logout />} />
			</Routes>
		</div>
	);
}

export default App;