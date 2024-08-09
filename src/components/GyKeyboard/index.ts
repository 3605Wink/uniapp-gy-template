function isBoolean(value: any): value is boolean {
	return typeof value === "boolean";
}
function isString(value: any): value is string {
	return typeof value === "string";
}

export const keyboardEmits = {
	"update:modelValue": (value: string) => isString(value),
	"update:type": (value: string) => isString(value),
	"update:show": (value: boolean) => isBoolean(value),
	"change": (value: string) => isString(value),
	"close": () => true,
	"backspace": () => true,
	"confirm": () => true,
};

export type KeyboardEmits = typeof keyboardEmits;
