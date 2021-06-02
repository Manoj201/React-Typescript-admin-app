import React from "react";
import { Typography as TypographyBase } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

const Typography = ({
	children,
	weight,
	size,
	colorBrightness,
	color,
	...props
}: any) => {
	var theme = useTheme();

	return (
		<TypographyBase
			style={{
				color: getColor(color, theme, colorBrightness),
				fontWeight: getFontWeight(weight),
				fontSize: getFontSize(size, props.variant, theme),
			}}
			{...props}
		>
			{children}
		</TypographyBase>
	);
};

export default Typography;

function getFontWeight(style: string) {
	switch (style) {
		case "light":
			return 300;
		case "medium":
			return 500;
		case "bold":
			return 600;
		default:
			return 400;
	}
}

function getFontSize(size: string, variant = "", theme: any) {
	var multiplier;

	switch (size) {
		case "sm":
			multiplier = 0.8;
			break;
		case "md":
			multiplier = 1.5;
			break;
		case "xl":
			multiplier = 2;
			break;
		case "xxl":
			multiplier = 3;
			break;
		default:
			multiplier = 1;
			break;
	}

	var defaultSize =
		variant && theme.typography[variant]
			? theme.typography[variant].fontSize
			: theme.typography.fontSize + "px";

	return `calc(${defaultSize} * ${multiplier})`;
}

function getColor(color: string, theme: any, brigtness = "main") {
	if (color && theme.palette[color] && theme.palette[color][brigtness]) {
		return theme.palette[color][brigtness];
	}
}
