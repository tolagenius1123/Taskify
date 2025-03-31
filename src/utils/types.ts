export type TaskStatus = "Pending" | "In Progress" | "Completed";

export type Task = {
	id: number;
	title: string;
	description: string;
	date: string;
	dueDate: string;
	status: TaskStatus;
};
