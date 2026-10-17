"use client";

import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from "next-themes";

// Suppress the known React 19 false-positive warning caused by next-themes
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
	const orig = console.error;
	console.error = (...args: unknown[]) => {
		if (
			typeof args[0] === "string" &&
			args[0].includes(
				"Encountered a script tag while rendering React component",
			)
		) {
			return;
		}
		orig.apply(console, args);
	};
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
