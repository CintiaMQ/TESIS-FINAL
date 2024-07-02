import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Landing from "./components/pages/Landing";
import Dashboard from "./components/layouts/Dashboard";
import InicioDashboard from "./components/pages/Dashboard/InicioDashboard";
import TestDashboard from "./components/pages/Dashboard/TestDashboard";
import ResultadoDashboard from "./components/pages/Dashboard/ResultadoDashboard";
import VideosDashboard from "./components/pages/Dashboard/VideosDashboard";
import UserRegister from "./components/pages/Register/UserRegister";
import Login from "./components/pages/Login/Login";
import ResultadosObtenidos from "./components/ResultadosObtenidos";

ReactDOM.createRoot(document.getElementById("cintia")!).render(
	<React.StrictMode>
		<UserProvider>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<UserRegister />} />
				<Route path='/dashboard/*' element={<Dashboard />}>
				<Route path='' element={<InicioDashboard />} />
				<Route path='test' element={<TestDashboard />} />
				<Route path='resultados' element={<ResultadoDashboard />} />
				<Route path='videos' element={<VideosDashboard />} />
				<Route path="resultados-obtenidos" element={<ResultadosObtenidos />} />
				
				</Route>
			</Routes>
		</BrowserRouter>
		</UserProvider>
	</React.StrictMode>
);
