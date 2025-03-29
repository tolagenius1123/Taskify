import { ListChecks, LoaderCircle, TrendingUp } from "lucide-react";
import styles from "./Overview.module.css";
import Card from "./_components/Card";
import TaskTable from "./_components/TaskTable";
import { initialTasks } from "../../data/test-data";

const Overview = () => {
	return (
		<div className={styles.container}>
			<div className={styles.cardCont}>
				<Card
					title="Pending Task"
					value={10}
					icon={<LoaderCircle size={24} color="#5271ff" />}
				/>
				<Card
					title="Task In Progress"
					value={5}
					icon={<TrendingUp size={24} color="#5271ff" />}
				/>
				<Card
					title="Completed Task"
					value={3}
					icon={<ListChecks size={24} color="#5271ff" />}
				/>
			</div>
			<TaskTable data={initialTasks} />
		</div>
	);
};

export default Overview;
