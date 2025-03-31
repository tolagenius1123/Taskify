import { useEffect, useState } from "react";
import styles from "../Overview.module.css";
import { ArrowLeft, ArrowRight, ChevronDown, Eye, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Task, TaskStatus } from "../../../utils/types";
import Modal from "../../../components/Modal/Modal";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { TailSpin } from "react-loader-spinner";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
	addTask,
	deleteTask,
	getTasks,
	updateTaskStatus,
} from "../../../services/actions/TaskActions";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const TaskTable = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
	const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
	});
	const [dueDate, setDueDate] = useState<Date | null>(new Date());

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleFilterDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 5;

	const totalPages = Math.ceil(tasks.length / tasksPerPage);

	const paginatedTasks = filteredTasks.slice(
		(currentPage - 1) * tasksPerPage,
		currentPage * tasksPerPage
	);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const dispatch = useDispatch();
	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const openModal = (task: Task) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
	};

	const openCreateTaskModal = () => setIsCreateModalOpen(true);
	const closeCreateTaskModal = () => setIsCreateModalOpen(false);

	const toggleDropdown = (id: number) => {
		setOpenDropdownId((prevId) => (prevId === id ? null : id));
	};

	const getStatusClass = (status: string) => {
		switch (status) {
			case "Pending":
				return styles.pending;
			case "In Progress":
				return styles.inProgress;
			case "Completed":
				return styles.completed;
			default:
				return "";
		}
	};

	const handleCreateTask = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTask.title.trim() || !newTask.description.trim()) {
			toast.error("Please fill in all fields");
			return;
		}

		const task = {
			title: newTask.title,
			description: newTask.description,
			date: new Date().toISOString().split("T")[0],
			dueDate: dueDate ? dueDate.toISOString().split("T")[0] : "",
			status: "Pending",
		};

		try {
			const response = await addTask(task);
			if (response.status === 201) {
				setNewTask({ title: "", description: "" });
				setDueDate(new Date());
				closeCreateTaskModal();
				fetchAllTasks();
				toast.success("Task created successfully");
			}
		} catch (error: any) {
			toast.error(error);
		}
	};

	const changeTaskStatus = async (id: number, status: TaskStatus) => {
		try {
			const response = await updateTaskStatus(id, status);
			if (response.status === 200) {
				fetchAllTasks();
				toast.success("Status updated successfully");
				setOpenDropdownId(null);
			}
		} catch (error: any) {
			toast.error(error);
		}
	};

	const removeTask = async (id: number) => {
		try {
			const response = await deleteTask(id);
			if (response.status === 200) {
				fetchAllTasks();
				toast.success("task deleted successfully");
			}
		} catch (error: any) {
			toast.error(error);
		}
	};

	const fetchAllTasks = async () => {
		dispatch(startLoading());
		try {
			const response = await getTasks();
			console.log(response);

			if (response.status === 200) {
				setTimeout(() => {
					setTasks(response.data);
					setFilteredTasks(response.data);
					dispatch(stopLoading());
				}, 2000);
			}
		} catch (error: any) {
			toast.error(error);
			dispatch(stopLoading());
		}
	};

	const filterTasks = (status: string | null) => {
		if (status) {
			const filtered = tasks.filter((task) => task.status === status);
			setFilteredTasks(filtered);
		} else {
			setFilteredTasks(tasks);
		}
		setIsDropdownOpen(false);
	};

	const handleDateChange = (date: Date | null) => {
		if (date && date < new Date()) {
			toast.error(
				"Due date must be later than today. Please select a valid date."
			);
			return;
		}
		setDueDate(date);
	};

	useEffect(() => {
		fetchAllTasks();
	}, []);

	return (
		<div className={styles.tableMain}>
			<div className={styles.header}>
				<h2 className={styles.title}>Task List</h2>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "5px",
					}}
				>
					<div className={styles.filterDropdownContainer}>
						<button
							className={styles.filterDropdownButton}
							onClick={() => toggleFilterDropdown()}
						>
							Filter by <ChevronDown size={15} />
						</button>

						{isDropdownOpen && (
							<div className={styles.filterDropdownMenu}>
								<div
									className={styles.filterDropdownItem}
									onClick={() => {
										setFilteredTasks(tasks);
										setIsDropdownOpen(false);
									}}
								>
									All
								</div>
								<div
									className={styles.filterDropdownItem}
									onClick={() => filterTasks("Pending")}
								>
									Pending
								</div>
								<div
									className={styles.filterDropdownItem}
									onClick={() => filterTasks("In Progress")}
								>
									In Progress
								</div>
								<div
									className={styles.filterDropdownItem}
									onClick={() => filterTasks("Completed")}
								>
									Completed
								</div>
							</div>
						)}
					</div>
					<CustomButton
						btnContent={<>Create Task +</>}
						btnStyles={styles.btn}
						btnType="button"
						handleSubmit={() => openCreateTaskModal()}
					/>
				</div>
			</div>
			<div className={styles.tableContainer}>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "space-around",
							margin: "50px",
						}}
					>
						<TailSpin
							color="#5271ff"
							height="100px"
							width="100px"
						/>
					</div>
				) : (
					<>
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.th}>Title</th>
									<th className={styles.th}>Date Created</th>
									<th className={styles.th}>Due Date</th>
									<th className={styles.th}>Status</th>
									<th className={styles.th}>Actions</th>
									<th className={styles.th}></th>
								</tr>
							</thead>
							<tbody>
								{paginatedTasks.length > 0 ? (
									paginatedTasks.map((task) => (
										<tr key={task.id}>
											<td className={styles.td}>
												{task.title}
											</td>
											<td className={styles.td}>
												{task.date}
											</td>
											<td className={styles.td}>
												{task.dueDate}
											</td>
											<td className={styles.td}>
												<span
													className={`${
														styles.status
													} ${getStatusClass(
														task.status
													)}`}
												>
													{task.status}
												</span>
											</td>
											<td
												className={`${styles.td} ${styles.actionButtons}`}
											>
												<button
													className={
														styles.viewButton
													}
													onClick={() =>
														openModal(task)
													}
												>
													<Eye size={18} />
												</button>
												<button
													className={
														styles.deleteButton
													}
													onClick={() =>
														removeTask(task.id)
													}
												>
													<Trash2 size={18} />
												</button>
											</td>
											<td className={styles.td}>
												<div
													className={
														styles.dropdownContainer
													}
												>
													<button
														className={
															styles.dropdownButton
														}
														onClick={() =>
															toggleDropdown(
																task.id
															)
														}
													>
														Change Status{" "}
														<ChevronDown
															size={15}
														/>
													</button>

													{openDropdownId ===
														task.id && (
														<div
															className={
																styles.dropdownMenu
															}
														>
															<div
																className={
																	styles.dropdownItem
																}
																onClick={() =>
																	changeTaskStatus(
																		task.id,
																		"Pending"
																	)
																}
															>
																Pending
															</div>
															<div
																className={
																	styles.dropdownItem
																}
																onClick={() =>
																	changeTaskStatus(
																		task.id,
																		"In Progress"
																	)
																}
															>
																In Progress
															</div>
															<div
																className={
																	styles.dropdownItem
																}
																onClick={() =>
																	changeTaskStatus(
																		task.id,
																		"Completed"
																	)
																}
															>
																Completed
															</div>
														</div>
													)}
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={30}
											style={{
												textAlign: "center",
												padding: "50px 0",
											}}
										>
											<div
												style={{
													marginTop: "20px",
													fontSize: "16px",
													fontWeight: "500",
													color: "#666",
												}}
											>
												No tasks available. Add a new
												task to get started!
											</div>
										</td>
									</tr>
								)}
							</tbody>
						</table>
						{/* Pagination */}
						<div className={styles.paginationCont}>
							<div className={styles.pagination}>
								<button
									onClick={prevPage}
									disabled={currentPage === 1}
								>
									<ArrowLeft
										size={15}
										style={{ marginTop: "0px" }}
									/>{" "}
									Previous
								</button>
								{/* <span>
						Page {currentPage} of {totalPages}
					</span> */}
								<button
									onClick={nextPage}
									disabled={currentPage === totalPages}
								>
									Next
									<ArrowRight
										size={15}
										style={{ marginTop: "0px" }}
									/>{" "}
								</button>
							</div>
						</div>
					</>
				)}
				{/* Modal */}
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title="Task Details"
				>
					{selectedTask && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
							}}
						>
							<p>
								<strong>Title:</strong> {selectedTask.title}
							</p>
							<p>
								<strong>Description:</strong>{" "}
								{selectedTask.description}
							</p>
							<p>
								<strong>Date Created:</strong>{" "}
								{selectedTask.date}
							</p>
							<p>
								<strong>Status:</strong>{" "}
								<span
									className={`${
										styles.status
									} ${getStatusClass(selectedTask.status)}`}
								>
									{selectedTask.status}
								</span>
							</p>
							{/* <p>
								<strong>Status:</strong> {selectedTask.status}
							</p> */}
						</div>
					)}
				</Modal>
				{/* Create Task Modal */}
				<Modal
					isOpen={isCreateModalOpen}
					onClose={closeCreateTaskModal}
					title="Create New Task"
				>
					<form
						onSubmit={handleCreateTask}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}
					>
						<label className={styles.inputCont}>
							<strong className={styles.strong}>Title</strong>
							<input
								type="text"
								value={newTask.title}
								onChange={(e) =>
									setNewTask({
										...newTask,
										title: e.target.value,
									})
								}
								className={styles.input}
							/>
						</label>
						<label className={styles.inputCont}>
							<strong className={styles.strong}>
								Description
							</strong>
							<textarea
								value={newTask.description}
								onChange={(e) =>
									setNewTask({
										...newTask,
										description: e.target.value,
									})
								}
								className={styles.textarea}
							/>
						</label>
						<label className={styles.inputCont}>
							<strong className={styles.strong}>Due date</strong>
							<DatePicker
								selected={dueDate}
								onChange={handleDateChange}
								dateFormat="yyyy-MM-dd"
								minDate={new Date()}
								className={styles.input}
							/>
						</label>

						<CustomButton
							btnContent={
								isLoading ? (
									<TailSpin
										color="white"
										height="28px"
										width="50px"
									/>
								) : (
									"Submit"
								)
							}
							btnStyles={styles.btn}
							btnType="submit"
						/>
					</form>
				</Modal>
			</div>
		</div>
	);
};

export default TaskTable;
