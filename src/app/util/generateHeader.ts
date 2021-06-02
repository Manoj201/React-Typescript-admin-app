import { v4 as uuidv4 } from "uuid";

interface APIHeaders {
	version: string;
	xCorrelationId: string;
	authType: string;
	authorization: string;
	actionId?: string;
	latitude?: string;
	locale?: string;
	longitude?: string;
	channelId: "MOBILE" | "WEB";
}

export const generateHeaders = (): APIHeaders => {
	const headers: APIHeaders = {
		version: "1",
		xCorrelationId: uuidv4(),
		authType: "JWT",
		authorization: uuidv4(),
		actionId: uuidv4(),
		latitude: "1.0",
		locale: "en",
		longitude: "1.0",
		channelId: "WEB",
	};
	return headers;
};
