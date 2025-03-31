import { useDispatch, useSelector } from "react-redux";
import styles from "../Login.module.css";
import { RootState } from "../../../redux/store/store";
import { TailSpin } from "react-loader-spinner";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import sidebarRoutes from "../../../routes/SidebarRoutes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { login } from "../../../redux/slices/authSlice";

const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const watchAllFields = watch();

	const isButtonDisabled =
		!watchAllFields.email ||
		!watchAllFields.password ||
		Object.keys(errors).length > 0;

	const onSubmit = (data: { email: string; password: string }) => {
		dispatch(startLoading());
		dispatch(login({ email: data.email }));

		setTimeout(() => {
			dispatch(stopLoading());
			toast.success("Login successful");
			navigate(sidebarRoutes.dashboard.route);
		}, 5000);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.logo}>
				<h1>Taskify</h1>
				<h3>Login to your account</h3>
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="email">Email</label>
				<input
					{...register("email")}
					type="email"
					placeholder="Enter a valid email"
					className={errors.email ? styles.inputError : ""}
				/>
				{errors.email && (
					<p className={styles.error}>{errors.email.message}</p>
				)}
			</div>
			<div className={styles.inputContainer}>
				<label htmlFor="password">Password</label>
				<input
					{...register("password")}
					type="password"
					placeholder="Enter your password"
					className={errors.password ? styles.inputError : ""}
				/>
				{errors.password && (
					<p className={styles.error}>{errors.password.message}</p>
				)}
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
				btnStyles={`${
					isButtonDisabled ? styles.btnDisabled : styles.btn
				}`}
				btnType="submit"
			/>
		</form>
	);
};

export default LoginForm;
