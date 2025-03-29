import { ReactNode } from "react";

type CustomButtonProps = {
	btnContent: ReactNode;
	btnStyles: string;
	btnType?: "submit" | "reset" | "button" | undefined;
	handleSubmit?: () => void;
	isDisabled?: boolean;
};

export default function CustomButton({
	btnContent,
	btnStyles,
	btnType,
	handleSubmit,
	isDisabled,
}: CustomButtonProps) {
	return (
		<button
			className={btnStyles}
			type={btnType}
			onClick={handleSubmit}
			disabled={isDisabled}
		>
			{btnContent}
		</button>
	);
}
