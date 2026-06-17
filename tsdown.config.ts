import { defineConfig } from "tsdown";

export default defineConfig({
	dts: {
		oxc: true,
		cjsReexport: true,
	},
	deps: {
		alwaysBundle: ["*"],
	},
	entry: "./source/index.ts",
	outDir: "./build",
	tsconfig: "./tsconfig.json",
	format: ["esm"],
	fixedExtension: false,
	minify: true,
});
