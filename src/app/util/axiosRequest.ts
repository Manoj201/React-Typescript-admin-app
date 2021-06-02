import axios, { AxiosInstance } from "axios";

export const axiosNoAuthClientInstance: AxiosInstance = axios.create({
	headers: {
		"Content-Type": "application/json",
		"Accept-Language": "en-US",
		Accept: "application/json",
		"Cache-Control": "no-cache",
		Pragma: "no-cache",
		"Access-Control-Allow-Origin": "*",
	},
});

export const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
