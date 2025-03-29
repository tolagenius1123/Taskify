import { ReactNode } from "react";
import styles from "../Overview.module.css";

interface CardProps {
	title: string;
	value: number | string;
	icon?: ReactNode;
}

const Card = ({ title, value, icon }: CardProps) => {
	return (
		<div className={styles.card}>
			<p className={styles.cardTitle}>{title}</p>
			<div className={styles.cardContent}>
				<p className={styles.cardValue}>{value}</p>
				{icon}
			</div>
		</div>
	);
};

export default Card;
