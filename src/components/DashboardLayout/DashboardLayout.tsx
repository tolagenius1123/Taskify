import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./DashboardLayout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router";

interface DashboardLayoutProps {
	children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className={styles.container}>
			<Sidebar />
			<div className={styles.mainPage}>
				<Header />
				<div className={styles.mainContent}>
					{children || <Outlet />}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
