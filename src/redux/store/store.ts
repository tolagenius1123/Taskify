import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../slices/loadingSlice";
import authReducer from "../slices/authSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
