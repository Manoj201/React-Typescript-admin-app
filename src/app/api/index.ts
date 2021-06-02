import { axiosNoAuthClientInstance } from "app/util/axiosRequest";

import { BankAccountControllerApi } from "app/api/services/accountApi/api";

const {
	// REACT_APP_WALLET_SERVICE_URL,
	REACT_APP_ACCOUNT_SERVICE_URL,
} = process.env;

const BankAccountApiService = new BankAccountControllerApi(
	undefined,
	REACT_APP_ACCOUNT_SERVICE_URL,
	axiosNoAuthClientInstance
);

export { BankAccountApiService };
