import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Login from "../pages/auth/Login";
import { MobileIcon } from "../assets/icons";

vi.mock("../pages/auth/_components/LoginForm", () => ({
	default: () => <div data-testid="login-form" />,
}));

vi.mock("../../assets/icons", () => ({
	MobileIcon: "mobile-icon.svg",
}));

describe("Login Component", () => {
	test("renders Login component", () => {
		render(<Login />);

		// Check if the login container is present
		expect(screen.getByTestId("login-container")).toBeInTheDocument();
	});

	test("displays the MobileIcon image", () => {
		render(<Login />);

		// Check if the image is rendered correctly
		const image = screen.getByRole("img", { name: /icon/i });
		expect(image).toHaveAttribute("src", MobileIcon);
	});

	test("renders the LoginForm component", () => {
		render(<Login />);

		// Check if the LoginForm component is rendered
		expect(screen.getByTestId("login-form")).toBeInTheDocument();
	});
});
