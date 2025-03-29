import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Overview from "../pages/overview/Overview";
import Users from "../pages/users/Users";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <Overview />,
			},
			{
				path: "users",
				element: <Users />,
			},
		],
	},
]);
