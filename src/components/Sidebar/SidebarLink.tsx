import { Link } from "react-router";
import styles from "./Sidebar.module.css";

type SidebarLinkProps = {
	href: string;
	label: string;
	icon: React.ReactNode;
	isActive: boolean;
};

const SidebarLink = ({ href, label, icon, isActive }: SidebarLinkProps) => {
	return (
		<Link to={href} className={styles.sidebarLink}>
			<span
				className={`${styles.indicator} ${
					isActive ? styles.activeIndicator : ""
				}`}
			></span>
			<span className={styles.content}>
				<span
					className={`${styles.icon} ${
						isActive ? styles.activeIcon : ""
					}`}
				>
					{icon}
				</span>
				<span
					className={`${styles.label} ${
						isActive ? styles.activeLabel : ""
					}`}
				>
					{label}
				</span>
			</span>
		</Link>
	);
};

export default SidebarLink;
