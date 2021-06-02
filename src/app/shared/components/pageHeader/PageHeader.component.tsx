import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { Typography } from "app/shared/components";

const useStyles = makeStyles((theme: any) => ({
	root: {
		display: "flex",
		flex: 1,
		alignItems: "center",
		marginBottom: 18,
	},
	backButton: {
		marginRight: 10,
	},
}));

export interface LinkData {
	label: string;
	link: string | null;
}

export interface PageHeaderProps {
	data: LinkData[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ data }) => {
	const classes = useStyles();
	const history = useHistory();

	const handleClick = (event: any, link: string | null) => {
		event.preventDefault();
		if (link) {
			history.push(link);
		}
	};

	return (
		<div className={classes.root}>
			<Breadcrumbs aria-label="breadcrumb">
				{data &&
					data.map((item, index) => {
						return index + 1 === data.length ? (
							<Typography
								variant="body1"
								weight="bold"
								key={`pageHeader-${index}`}
							>
								{item.label}
							</Typography>
						) : (
							<Link
								color="inherit"
								href="/"
								onClick={(event: any) => handleClick(event, item.link)}
								key={`pageHeader-${index}`}
							>
								<Typography variant="body1" weight="medium">
									{item.label}
								</Typography>
							</Link>
						);
					})}
			</Breadcrumbs>
		</div>
	);
};

export default PageHeader;
