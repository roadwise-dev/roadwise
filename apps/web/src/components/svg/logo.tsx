import type React from "react";

type LogoVariant =
	| "blackOnWhite" // black chevron, white background
	| "whiteOnBlack" // white chevron, black background
	| "black" // black chevron, no background
	| "white"; // white chevron, no background

interface LogoProps extends React.SVGProps<SVGSVGElement> {
	variant?: LogoVariant;
	size?: number; // convenience: size in px (defaults to 100)
}

const Logo: React.FC<LogoProps> = ({
	variant = "blackOnWhite",
	size = 100,
	...props
}) => {
	// Decide colors based on variant
	const stroke =
		variant === "whiteOnBlack" || variant === "white" ? "white" : "black";
	const background =
		variant === "blackOnWhite"
			? "white"
			: variant === "whiteOnBlack"
				? "black"
				: "none";

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			role="img"
			aria-label="Roadwise Logo"
			{...props}
		>
			{/* Background with rounded corners */}
			<rect
				x="0"
				y="0"
				width="24"
				height="24"
				rx="4"
				ry="4"
				fill={background}
			/>

			{/* Chevron */}
			<path
				d="m18 15-6-6-6 6"
				stroke={stroke}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	);
};

export default Logo;
