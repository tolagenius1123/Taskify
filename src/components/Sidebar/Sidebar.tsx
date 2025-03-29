import styles from "./Sidebar.module.css";
import {
	DisputesIcon,
	NotificationsIcon,
	OrdersIcon,
	OverviewIcon,
	TransactionsIcon,
	UsersIcon,
} from "../../assets/icons";
import { useLocation } from "react-router";
import SidebarLink from "./SidebarLink";
import sidebarRoutes from "../../routes/SidebarRoutes";

const Sidebar = () => {
	const location = useLocation();
	const pathname = location.pathname;

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
		<div className={styles.sidebar}>
			<div className={styles.container}>
				<div className={styles.logo}>Taskify</div>
				<div className={styles.navLinks}>
					{routes.map((route) => (
						<SidebarLink
							key={route.href}
							href={route.href}
							label={route.label}
							icon={route.icon}
							isActive={pathname === route.href}
						/>
					))}
				</div>

				{/* <div className={styles.userInfo}>
					<div className={styles.userDetails}>
						<div>
							<p className={styles.userEmail}>
								tolajinadu1123@gmail.com
							</p>
							<p className={styles.userRole}>Admin</p>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Sidebar;
