import React from "react";
import {
	Route,
	Switch,
	Redirect,
	BrowserRouter as Router,
} from "react-router-dom";

import AppLayout from "./AppLayout";
import LoginPage from "app/features/authentication/pages/Login.page";

const { PUBLIC_URL } = process.env;

const App: React.FC<any> = () => {
	const isAuthenticated = true;

	const PrivateRoute = ({ component, ...rest }: any) => {
		return (
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? (
						React.createElement(component, props)
					) : (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location,
								},
							}}
						/>
					)
				}
			/>
		);
	};

	const PublicRoute = ({ component, ...rest }: any) => {
		return (
			<Route
				{...rest}
				render={(props) =>
					isAuthenticated ? (
						<Redirect
							to={{
								pathname: "/",
							}}
						/>
					) : (
						React.createElement(component, props)
					)
				}
			/>
		);
	};

	return (
		<Router basename={PUBLIC_URL}>
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
				<PrivateRoute path="/app" component={AppLayout} />
				<PublicRoute path="/login" component={LoginPage} />
			</Switch>
		</Router>
	);
};

export default App;
