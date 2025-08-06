// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import TrainerRecommendation from "./components/TrainerRecommendation";
import UserLayout from "./components/UserLayout";

export const AuthContext = createContext();

function getUserFromSessionStorage() {
	const userJson = sessionStorage.getItem("user");
	return userJson ? JSON.parse(userJson) : null;
}

function App() {
	const [user, setUser] = useState(getUserFromSessionStorage());

	return (
		<div className="container">
			<AuthContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/user" element={<UserLayout />}>
						<Route index element={<Home />} />
						<Route path="trainer-recommendation" element={<TrainerRecommendation />} />
					</Route>
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;