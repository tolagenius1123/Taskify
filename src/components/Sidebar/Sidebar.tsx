import styles from "./Sidebar.module.css";
import {
	DisputesIcon,
	NotificationsIcon,
	OrdersIcon,
	OverviewIcon,
	TransactionsIcon,
	UsersIcon,
} from "../../assets/icons";
import { useLocation, useNavigate } from "react-router";
import SidebarLink from "./SidebarLink";
import sidebarRoutes from "../../routes/SidebarRoutes";
import CustomButton from "../CustomButton/CustomButton";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const pathname = location.pathname;
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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
				<div className="">
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
				</div>

				<div className={styles.logout}>
					<CustomButton
						btnContent={
							<div className={styles.btnContent}>
								<LogOut size={20} /> Logout
							</div>
						}
						btnStyles={styles.btn}
						btnType="button"
						handleSubmit={openModal}
					/>
				</div>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal} title="Logout">
				<div className={styles.logoutTitle}>
					Are you sure you want to logout?
				</div>
				<div className={styles.modalActions}>
					<CustomButton
						btnContent="Logout"
						btnStyles={styles.logBtn}
						btnType="submit"
						handleSubmit={() => {
							dispatch(logout());
							navigate("/");
							toast.success("Logged out successfully");
						}}
					/>
					<CustomButton
						btnContent="Cancel"
						btnStyles={styles.logBtn}
						btnType="button"
						handleSubmit={closeModal}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Sidebar;
