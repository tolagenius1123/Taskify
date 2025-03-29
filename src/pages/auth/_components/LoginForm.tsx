import { useDispatch, useSelector } from "react-redux";
import styles from "../Login.module.css";
import { RootState } from "../../../redux/store/store";
import { TailSpin } from "react-loader-spinner";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import sidebarRoutes from "../../../routes/SidebarRoutes";

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginDetails((prev) => ({ ...prev, [name]: [value] }));
		console.log(loginDetails);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(startLoading());

		setTimeout(() => {
			dispatch(stopLoading());
			toast.success("Login successful");
			navigate(sidebarRoutes.dashboard.route);
		}, 5000);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.logo}>
				<h1>Taskify</h1>
				<h3>Login to your account</h3>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="email">Email</label>
				<input
					name="email"
					type="email"
					placeholder="Enter a valid email"
					value={loginDetails.email}
					onChange={handleChange}
				/>
				<p className={styles.error}>Email is required</p>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="password">Password</label>
				<input
					name="password"
					type="password"
					placeholder="Enter your password"
					value={loginDetails.password}
					onChange={handleChange}
				/>
				<p className={styles.error}>password is required</p>
			</div>
			<div className={styles.forgotPassword}>
				<a href="/">Forgot password?</a>
			</div>
			<div className={styles.signup}>
				<div className={styles.signUpLink}>
					Don&apos;t have an account?{" "}
					<a href="/" className={styles.signUpLink}>
						Sign Up
					</a>
				</div>
			</div>

			<CustomButton
				btnContent={
					isLoading ? (
						<TailSpin color="white" height="28px" width="50px" />
					) : (
						"Login"
					)
				}
				btnStyles={styles.btn}
				// btnStyles={cn(
				// 	"bg-customBlue flex items-center justify-around text-sm md:text-lg text-white rounded-lg cursor-pointer h-[40px] w-full mt-5",
				// 	isButtonDisabled && "opacity-25"
				// )}
				btnType="submit"
			/>
		</form>
	);
};

export default LoginForm;
