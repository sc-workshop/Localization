import { addFormatter, Locale } from ".";

const emoji = {
	success: "✅",
	arrowDown: "⬇️",
} as any;

addFormatter("emoji", (value) => {
	return emoji[value] || "";
});

console.log(Locale.GetString("op:ready"));
console.log(Locale.GetString("download:useLink"));
