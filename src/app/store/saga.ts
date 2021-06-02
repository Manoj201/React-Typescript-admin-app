import bankAccountSaga from "app/features/bankAccount/store/BankAccount.saga";
import { all } from "@redux-saga/core/effects";

export default function* rootSaga() {
	yield all([...bankAccountSaga]);
}
