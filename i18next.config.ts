export default {
	locales: ["en-US"],
	extract: {
		input: "source/**/*.{js,jsx,ts,tsx}",
		output: "data/{{language}}/{{namespace}}.json",
	},
};
