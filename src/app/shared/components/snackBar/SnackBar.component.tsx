import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface SnackBarPropTypes {
	open?: boolean;
	onClose: () => void;
	autoHideDuration?: number;
	message: string;
	type: "success" | "error" | "warning" | "info";
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const CustomizedSnackbars: React.FC<SnackBarPropTypes> = ({
	open,
	onClose,
	autoHideDuration,
	message,
	type,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Snackbar
				open={open}
				autoHideDuration={autoHideDuration || 3000}
				onClose={onClose}
			>
				<Alert onClose={onClose} severity={type}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default CustomizedSnackbars;
