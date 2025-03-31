import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import Overview from "../pages/overview/Overview";
import Users from "../pages/users/Users";
import Transactions from "../pages/transactions/Transactions";
import Orders from "../pages/orders/Orders";
import Disputes from "../pages/disputes/Disputes";
import Notifications from "../pages/notifications/Notifications";

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
			{
				path: "transactions",
				element: <Transactions />,
			},
			{
				path: "orders",
				element: <Orders />,
			},
			{
				path: "disputes",
				element: <Disputes />,
			},
			{
				path: "notifications",
				element: <Notifications />,
			},
		],
	},
]);
