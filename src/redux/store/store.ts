import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "../slices/loadingSlice";

const store = configureStore({
	reducer: {
		loading: loadingReducer, // Register the loading slice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
