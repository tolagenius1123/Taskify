import AxiosClient from "../../config/AxiosClient";

export const getTasks = () => {
	return AxiosClient.get(`${import.meta.env.VITE_BASE_URL}/tasks`)
		.then((response) => response)
		.catch((error) => error);
};

export const getTaskDetails = (taskId: number) => {
	return AxiosClient.get(`${import.meta.env.VITE_BASE_URL}/tasks/${taskId}`)
		.then((response) => response)
		.catch((error) => error);
};

export const updateTaskStatus = (taskId: number, newStatus: string) => {
	return AxiosClient.patch(
		`${import.meta.env.VITE_BASE_URL}/tasks/${String(taskId)}`,
		{
			status: newStatus,
		}
	)
		.then((response) => response)
		.catch((error) => error);
};

export const addTask = (task: any) => {
	return AxiosClient.post(`${import.meta.env.VITE_BASE_URL}/tasks`, task)
		.then((response) => response)
		.catch((error) => error);
};

export const deleteTask = (taskId: number) => {
	return AxiosClient.delete(
		`${import.meta.env.VITE_BASE_URL}/tasks/${taskId}`
	)
		.then((response) => response)
		.catch((error) => error);
};
