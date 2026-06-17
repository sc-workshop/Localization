import { m } from "./generated/messages.js";
import { customFormatter } from "./generated/registry.js";
import { locales as AvailableLocales } from "./generated/runtime.js";

export { addFormatter } from "./generated/registry.js";
export { locales as AvailableLocales } from "./generated/runtime.js";

export type TextID = keyof typeof m;
export type TextIDInputs<K extends TextID> = Parameters<(typeof m)[K]>[0];
export type TextIDValue<K extends TextID> = ReturnType<(typeof m)[K]>;
export type LocaleName = (typeof AvailableLocales)[number];
export type LocaleMap<K extends TextID> = Record<LocaleName, TextIDValue<K>>;

type GetStringOptions<K extends TextID = TextID> = {
	text_id: K;
	inputs?: TextIDInputs<K>;
	locale?: LocaleName;
};

type GetUnsafeStringOptions = {
	text_id: string;
	inputs?: object;
	locale?: LocaleName;
};

export class Locale {
	constructor(private localeName: LocaleName) {}

	static GetString<K extends TextID>(text_id: K): TextIDValue<K>;
	static GetString<K extends TextID>(
		options: GetStringOptions<K>,
	): TextIDValue<K>;
	static GetString<K extends TextID>(value: GetStringOptions<K> | K): any {
		if (typeof value === "string") {
			return Locale.GetString({ text_id: value as TextIDValue<any> });
		}

		const messageFn = m[value.text_id as TextID];
		return messageFn(value.inputs as any, { locale: value.locale });
	}

	static GetUnsafeString(text_id: string): string | undefined;
	static GetUnsafeString(options: GetUnsafeStringOptions): string | undefined;
	static GetUnsafeString(value: GetUnsafeStringOptions | string) {
		if (typeof value === "string") {
			return Locale.GetUnsafeString({ text_id: value });
		}

		const messageFn = m[value.text_id as TextID];
		if (typeof messageFn === "function") {
			return Locale.GetString(value as GetStringOptions<any>);
		}

		return undefined;
	}

	static GetMap<K extends TextID>(
		text_id: K,
		inputs?: TextIDInputs<K>,
	): Record<LocaleName, TextIDValue<K>> {
		return AvailableLocales.reduce(
			(result, name) => {
				result[name] = Locale.GetString({ text_id, inputs, locale: name });
				return result;
			},
			{} as LocaleMap<K>,
		);
	}

	public get<K extends TextID>(
		text_id: K,
		inputs?: TextIDInputs<K>,
	): TextIDValue<K> {
		return Locale.GetString({ text_id, inputs, locale: this.localeName });
	}

	public getProgress<K extends TextID>(
		text_id: K,
		inputs?: TextIDInputs<K>,
	): TextIDValue<K> {
		const base = Locale.GetString({
			text_id,
			inputs,
			locale: this.localeName,
		});
		const emoji = customFormatter(this.localeName, "emoji", {
			value: "progress",
		});

		return `${emoji} ${base}` as TextIDValue<K>;
	}

	public getError<K extends TextID>(
		text_id: K,
		inputs?: TextIDInputs<K>,
	): TextIDValue<K> {
		const base = Locale.GetString({
			text_id,
			inputs,
			locale: this.localeName,
		});
		const emoji = customFormatter(this.localeName, "emoji", {
			value: "error",
		});

		return `${emoji} ${base}` as TextIDValue<K>;
	}

	get Locale(): LocaleName {
		return this.localeName;
	}
}

/**
 * Special helper function to help annotate text in IDE
 */
export function TextID(text_id: TextID): TextID {
	return text_id;
}
