export function debounceRef<T>(value: T, timeout = 100) {
	let timer: ReturnType<typeof setTimeout>;
	return customRef<T>((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(newValue: T) {
				clearTimeout(timer);
				timer = setTimeout(() => {
					trigger();
					value = newValue;
				}, timeout);
			},
		};
	});
}
