<!-- eslint-disable unicorn/prefer-number-properties -->
<script setup lang="ts">
import gsap from "gsap";

const props = withDefaults(
	defineProps<{
		value?: number | string;
		duration?: number;
		fractionDigits?: number;
		thousands?: boolean;
		color?: string;
	}>(),
	{
		value: 0,
		duration: 0.8,
		fractionDigits: 2,
		thousands: false,
		color: "#ffffff",
	}
);

const _value = ref<number>(0);

const isNumeric = (value: any): value is number | string => {
	return typeof value === "number" || (!isNaN(Number(value)) && isFinite(Number(value)));
};
watch(
	() => props.value,
	newValue => {
		if (typeof newValue === "number" || (typeof newValue === "string" && isNumeric(newValue))) {
			gsap.to(_value, {
				value: Number(newValue),
				duration: props.duration,
				roundProps: "value",
			});
		}
	},
	{
		immediate: true,
	}
);

const formatValue = (value: number | string, fractionDigits: number, thousands: boolean): string => {
	const num = Number(value);
	if (isNaN(num)) return value.toString();

	let formattedNum = num.toFixed(fractionDigits);
	if (thousands && num >= 10000 && num < 100000000) formattedNum = `${(num / 10000).toFixed(2)}w`;

	return formattedNum;
};

const formattedNumber = computed(() => {
	return formatValue(_value.value, props.fractionDigits, props.thousands);
});
</script>

<template>
	<span class="vnumber">
		<slot :value="_value">
			{{ formattedNumber }}
		</slot>
	</span>
</template>

<style scoped>
.vnumber {
	letter-spacing: 0.5px;
	font-feature-settings: "tnum";
	text-align: left;
	vertical-align: top;
}
</style>
