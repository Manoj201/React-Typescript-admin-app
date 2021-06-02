import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: "100%",
	},
}));

export interface MenuData {
	label: string;
	value: string;
}

export interface DropdownProps {
	formik: any;
	name: string;
	label: string;
	data: MenuData[];
	required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ formik, name, label, data }) => {
	const classes = useStyles();

	return (
		<FormControl
			className={classes.formControl}
			error={formik.touched[name] && Boolean(formik.errors[name])}
		>
			<InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
			<Select
				labelId="demo-simple-select-helper-label"
				id={name}
				name={name}
				label={label}
				value={formik.values[name]}
				onChange={formik.handleChange}
			>
				{data &&
					data.map((menu, index) => (
						<MenuItem
							id={`${name}-${menu.label}-${index}`}
							value={menu.value}
							key={`${name}-${menu.label}-${index}`}
						>
							{menu.label}
						</MenuItem>
					))}
			</Select>
			{formik.touched[name] && formik.errors[name] && (
				<FormHelperText>{formik.errors[name]}</FormHelperText>
			)}
		</FormControl>
	);
};

export default Dropdown;
