import styles from "./Header.module.css";
import MobileSidebar from "../Sidebar/MobileSidebar";
import {
	SettingsIcon,
	NotificationsIcon as NotifyIcon,
} from "../../assets/images";
import sidebarRoutes from "../../routes/SidebarRoutes";
import {
	DisputesIcon,
	OrdersIcon,
	OverviewIcon,
	TransactionsIcon,
	UsersIcon,
	NotificationsIcon,
} from "../../assets/icons";

const Header = () => {
	const routes = [
		{
			href: sidebarRoutes.dashboard.route,
			label: "Overview",
			icon: <OverviewIcon width="20" height="20" />,
		},
		{
			href: sidebarRoutes.users.route,
			label: "Users",
			icon: <UsersIcon width="20" height="20" />,
		},
		{
			href: sidebarRoutes.transactions.route,
			label: "Transactions",
			icon: <TransactionsIcon width="20" height="20" />,
		},
		{
			href: sidebarRoutes.orders.route,
			label: "Orders",
			icon: <OrdersIcon width="20" height="20" />,
		},
		{
			href: sidebarRoutes.disputes.route,
			label: "Disputes",
			icon: <DisputesIcon width="20" height="20" />,
		},
		{
			href: sidebarRoutes.notifications.route,
			label: "Notifications",
			icon: <NotificationsIcon width="20" height="20" />,
		},
	];

	return (
		<div className={styles.header}>
			<div className={styles.leftSection}>
				<MobileSidebar routes={routes} />
				<h1 className={styles.title}>Overview</h1>
			</div>
			<div className={styles.rightSection}>
				<img
					src={SettingsIcon}
					alt="Settings Icon"
					className={styles.icon}
				/>
				<img
					src={NotifyIcon}
					alt="Notifications Icon"
					className={styles.icon}
				/>
			</div>
		</div>
	);
};

export default Header;
