import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu } from "@material-ui/core";
import {
	Menu as MenuIcon,
	Person as AccountIcon,
	ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./style";

// components
import { Typography } from "app/shared/components";

// context
import {
	useLayoutState,
	useLayoutDispatch,
	toggleSidebar,
} from "app/context/Layout.Context";

export default function Header(props: any) {
	var classes = useStyles();

	// global
	var layoutState = useLayoutState();
	var layoutDispatch = useLayoutDispatch();

	var [profileMenu, setProfileMenu] = useState(null);

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					onClick={() => toggleSidebar(layoutDispatch)}
					className={classNames(
						classes.headerMenuButtonSandwich,
						classes.headerMenuButtonCollapse
					)}
				>
					{layoutState.isSidebarOpened ? (
						<ArrowBackIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					) : (
						<MenuIcon
							classes={{
								root: classNames(
									classes.headerIcon,
									classes.headerIconCollapse
								),
							}}
						/>
					)}
				</IconButton>
				<Typography variant="h6" weight="medium" className={classes.logotype}>
					WalleX Admin
				</Typography>
				<div className={classes.grow} />

				<IconButton
					aria-haspopup="true"
					color="inherit"
					className={classes.headerMenuButton}
					aria-controls="profile-menu"
				>
					<AccountIcon classes={{ root: classes.headerIcon }} />
				</IconButton>

				<Menu
					id="profile-menu"
					open={Boolean(profileMenu)}
					anchorEl={profileMenu}
					onClose={() => setProfileMenu(null)}
					className={classes.headerMenu}
					classes={{ paper: classes.profileMenu }}
					disableAutoFocusItem
				>
					<div className={classes.profileMenuUser}>
						<Typography variant="h4" weight="medium">
							Manoj Gamachchige
						</Typography>
					</div>
					<div className={classes.profileMenuUser}>
						<Typography
							className={classes.profileMenuLink}
							color="primary"
							onClick={() => {}}
						>
							Sign Out
						</Typography>
					</div>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
