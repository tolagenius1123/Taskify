import { JSX, useState } from "react";
import styles from "./Sidebar.module.css";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import SidebarLink from "./SidebarLink";
import { useLocation } from "react-router";

interface Route {
	href: string;
	label: string;
	icon?: JSX.Element;
}

interface SidebarProps {
	routes: Route[];
}

const MobileSidebar: React.FC<SidebarProps> = ({ routes }) => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<>
			<button
				className={styles.menuButton}
				onClick={() => setIsOpen(true)}
			>
				<MenuIcon size={24} />
			</button>

			<div
				className={`${styles.mobileSidebar} ${
					isOpen ? styles.open : ""
				}`}
			>
				<div className={styles.sidebarHeader}>
					<button
						className={styles.closeButton}
						onClick={() => setIsOpen(false)}
					>
						<CloseIcon size={24} />
					</button>
					<div className={styles.logo}>Taskify</div>
				</div>

				<nav className={styles.navLinks}>
					{routes.map((route) => (
						<SidebarLink
							key={route.href}
							href={route.href}
							label={route.label}
							icon={route.icon}
							isActive={pathname === route.href}
						/>
					))}
				</nav>

				<div className={styles.userSection}>
					<div className={styles.userInfo}>
						<div>
							<p className={styles.userName}>tolajinadu1123</p>
							<p className={styles.userRole}>Admin</p>
						</div>
					</div>
				</div>
			</div>

			{isOpen && (
				<div
					className={styles.overlay}
					onClick={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};

export default MobileSidebar;
