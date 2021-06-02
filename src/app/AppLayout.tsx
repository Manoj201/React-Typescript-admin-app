import React from "react";
import classnames from "classnames";
import { AppHeader, AppSidebar } from "app/shared/components";
import { Switch, Route } from "react-router";

import BankAccountPage from "app/features/bankAccount/pages/BankAccount.page";
import AddEditBankAccountPage from "app/features/bankAccount/pages/AddEditBankAccount.page";

import { makeStyles } from "@material-ui/styles";
import { useLayoutState } from "app/context/Layout.Context";

import ROUTES from "app/configs/route";

const styles = makeStyles((theme: any) => ({
	root: {
		display: "flex",
		maxWidth: "100vw",
		overflowX: "hidden",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		width: `calc(100vw - 240px)`,
		minHeight: "100vh",
	},
	contentShift: {
		width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	fakeToolbar: {
		...theme.mixins.toolbar,
	},
	link: {
		"&:not(:first-child)": {
			paddingLeft: 15,
		},
	},
}));

const AppLayout = () => {
	const classes = styles();
	const layoutState = useLayoutState();

	return (
		<div className={classes.root}>
			<AppHeader />
			<AppSidebar />
			<div
				className={classnames(classes.content, {
					[classes.contentShift]: layoutState.isSidebarOpened,
				})}
			>
				<div className={classes.fakeToolbar} />
				<Switch>
					<Route path={ROUTES.BANK_ACCOUNT} exact component={BankAccountPage} />
					<Route
						path={ROUTES.BANK_ACCOUNT_ADD}
						exact
						component={AddEditBankAccountPage}
					/>
					<Route
						path={ROUTES.BANK_ACCOUNT_EDIT}
						exact
						component={AddEditBankAccountPage}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default AppLayout;
