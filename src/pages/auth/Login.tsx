import { MobileIcon } from "../../assets/icons";
import LoginForm from "./_components/LoginForm";
import styles from "./Login.module.css";

const Login = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<img src={MobileIcon} alt="icon" />
			</div>
			<div className={styles.right}>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
