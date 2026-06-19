export default {
	locales: ["en-US", "en-GB", "bg", "cs", "da", "de", "el", "es-ES", "es-419", "fi", "fr", "hi", "hr", "hu", "id", "it", "ja", "ko", "lt", "nl", "no", "pl", "pt-BR", "ro", "ru", "sv-SE", "th", "tr", "uk", "vi", "zh-CN", "zh-TW"],
	extract: {
		input: "source/**/*.{js,jsx,ts,tsx}",
		output: "data/{{language}}/{{namespace}}.json",
	},
};
