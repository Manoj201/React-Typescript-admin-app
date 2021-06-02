import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";

import { LayoutProvider } from "app/context/Layout.Context";

import Themes from "./themes";
import { store } from "./app/store/store";

ReactDOM.render(
	<React.StrictMode>
		<LayoutProvider>
			<ThemeProvider theme={Themes.default}>
				<CssBaseline />
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</LayoutProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
