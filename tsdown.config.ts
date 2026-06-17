import { defineConfig } from "tsdown";

export default defineConfig({
	dts: {
		tsgo: true,
	},
	deps: {
		alwaysBundle: ["*"],
	},
	entry: "./source/index.ts",
	outDir: "./build",
	tsconfig: "./tsconfig.json",
});
