import { TrendingUp } from "lucide-react";
import styles from "./Overview.module.css";
import Card from "./_components/Card";
import TaskTable from "./_components/TaskTable";
import { getTasks } from "../../services/actions/TaskActions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Overview = () => {
	const [statistics, setStatistics] = useState({
		isPending: 0,
		inProgress: 0,
		isCompleted: 0,
	});

	const getStatistics = async () => {
		try {
			const response = await getTasks();

			const stats = response?.data?.reduce(
				(acc: any, task: any) => {
					if (task.status === "Pending") acc.isPending++;
					if (task.status === "In Progress") acc.inProgress++;
					if (task.status === "Completed") acc.isCompleted++;
					return acc;
				},
				{ isPending: 0, inProgress: 0, isCompleted: 0 }
			);

			setStatistics(stats);
		} catch (error: any) {
			toast.error(error);
		}
	};

	useEffect(() => {
		getStatistics();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.cardCont}>
				<Card
					title="Pending Task"
					value={statistics.isPending}
					icon={<TrendingUp size={24} color="#5271ff" />}
				/>
				<Card
					title="Task In Progress"
					value={statistics.inProgress}
					icon={<TrendingUp size={24} color="#5271ff" />}
				/>
				<Card
					title="Completed Task"
					value={statistics.isCompleted}
					icon={<TrendingUp size={24} color="#5271ff" />}
				/>
			</div>
			<TaskTable />
		</div>
	);
};

export default Overview;
