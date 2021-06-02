import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga";

import { reducer as bankAccountReducer } from "app/features/bankAccount/store/BankAccount.slice";

//initialize saga middleware
const sagaMiddleware = createSagaMiddleware();

//Push all the middlewares to below array
const middlewares = [sagaMiddleware];

export const store = configureStore({
	reducer: {
		bankAccount: bankAccountReducer,
	},
	middleware: middlewares,
});

//run saga middleware
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
