import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
	Home as HomeIcon,
	ArrowBack as ArrowBackIcon,
	AccountBalance as BankIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./style";

// components
import SidebarLink from "./link/Link";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "app/context/Layout.Context";

const structure = [
	{ id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
	// { id: 1, type: "divider" },
	{
		id: 2,
		label: "Bank Account",
		link: "/app/bank-account",
		icon: <BankIcon />,
	},
];

function Sidebar({ location }: any) {
	var classes: any = useStyles();
	var theme: any = useTheme();

	// global
	var { isSidebarOpened } = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	// local
	var [isPermanent, setPermanent] = useState(true);

	useEffect(function () {
		window.addEventListener("resize", handleWindowWidthChange);
		handleWindowWidthChange();
		return function cleanup() {
			window.removeEventListener("resize", handleWindowWidthChange);
		};
	});

	return (
		<Drawer
			variant={isPermanent ? "permanent" : "temporary"}
			className={classNames(classes.drawer, {
				[classes.drawerOpen]: isSidebarOpened,
				[classes.drawerClose]: !isSidebarOpened,
			})}
			classes={{
				paper: classNames({
					[classes.drawerOpen]: isSidebarOpened,
					[classes.drawerClose]: !isSidebarOpened,
				}),
			}}
			open={isSidebarOpened}
		>
			<div className={classes.toolbar} />
			<div className={classes.mobileBackButton}>
				<IconButton onClick={() => toggleSidebar(layoutDispatch)}>
					<ArrowBackIcon
						classes={{
							root: classNames(classes.headerIcon, classes.headerIconCollapse),
						}}
					/>
				</IconButton>
			</div>
			<List className={classes.sidebarList}>
				{structure.map((link) => (
					<SidebarLink
						key={link.id}
						location={location}
						isSidebarOpened={isSidebarOpened}
						{...link}
					/>
				))}
			</List>
		</Drawer>
	);

	// ##################################################################
	function handleWindowWidthChange() {
		var windowWidth = window.innerWidth;
		var breakpointWidth = theme.breakpoints.values.md;
		var isSmallScreen = windowWidth < breakpointWidth;

		if (isSmallScreen && isPermanent) {
			setPermanent(false);
		} else if (!isSmallScreen && !isPermanent) {
			setPermanent(true);
		}
	}
}

export default withRouter(Sidebar);
