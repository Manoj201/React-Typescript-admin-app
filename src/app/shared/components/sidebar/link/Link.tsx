import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

export default function SidebarLink({
	link,
	icon,
	label,
	location,
	isSidebarOpened,
	type,
}: any) {
	var classes = useStyles();
	const history = useHistory();

	// local
	var [isOpen, setIsOpen] = useState(false);
	var isLinkActive =
		link &&
		(location.pathname === link || location.pathname.indexOf(link) !== -1);

	if (type === "title")
		return (
			<Typography
				className={classnames(classes.linkText, classes.sectionTitle, {
					[classes.linkTextHidden]: !isSidebarOpened,
				})}
			>
				{label}
			</Typography>
		);

	if (type === "divider") return <Divider className={classes.divider} />;

	return (
		<>
			<ListItem
				button
				component={link && Link}
				onClick={toggleCollapse}
				className={classes.link}
				to={link}
				disableRipple
			>
				<ListItemIcon
					className={classnames(classes.linkIcon, {
						[classes.linkIconActive]: isLinkActive,
					})}
				>
					{icon ? icon : <InboxIcon />}
				</ListItemIcon>
				<ListItemText
					classes={{
						primary: classnames(classes.linkText, {
							[classes.linkTextActive]: isLinkActive,
							[classes.linkTextHidden]: !isSidebarOpened,
						}),
					}}
					primary={label}
				/>
			</ListItem>
		</>
	);

	// ###########################################################

	function toggleCollapse(e: any) {
		if (isSidebarOpened) {
			e.preventDefault();
			setIsOpen(!isOpen);
		}
		history.push(link);
	}
}
