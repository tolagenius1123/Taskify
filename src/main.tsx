import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<ToastContainer position="top-right" />
		</Provider>
	</StrictMode>
);
