<!-- eslint-disable @typescript-eslint/ban-types -->
<script lang="ts" setup>
import gsap from "gsap";

type EaseString =
	| "none"
	| "power1"
	| "power1.in"
	| "power1.out"
	| "power1.inOut"
	| "power2"
	| "power2.in"
	| "power2.out"
	| "power2.inOut"
	| "power3"
	| "power3.in"
	| "power3.out"
	| "power3.inOut"
	| "power4"
	| "power4.in"
	| "power4.out"
	| "power4.inOut"
	| "back"
	| "back.in"
	| "back.out"
	| "back.inOut"
	| "bounce"
	| "bounce.in"
	| "bounce.out"
	| "bounce.inOut"
	| "circ"
	| "circ.in"
	| "circ.out"
	| "circ.inOut"
	| "elastic"
	| "elastic.in"
	| "elastic.out"
	| "elastic.inOut"
	| "expo"
	| "expo.in"
	| "expo.out"
	| "expo.inOut"
	| "sine"
	| "sine.in"
	| "sine.out"
	| "sine.inOut"
	| string;

type CustomStyleType = Omit<any, ExcludeProps>;
type ExcludeProps = "opacity" & "ease" & "transform";
let {
	name = "fade",
	duration = 300,
	show,
	ease = "power1.out",
	customStyle,
} = defineProps<{
	show: boolean;
	name?:
		| "fade"
		| "fade-up"
		| "fade-down"
		| "fade-left"
		| "fade-right"
		| "slide-up"
		| "slide-down"
		| "slide-left"
		| "slide-right"
		| "zoom";
	duration?: number;
	ease?: EaseString;
	customStyle?: CustomStyleType;
}>();

const emits = defineEmits(["click", "onStart", "onComplete"]);
const transitions = {
	"fade": {
		start: {
			opacity: 0,
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			ease: "power1.out",
		},
	},
	"fade-up": {
		start: {
			opacity: 0,
			transform: "translate3d(0px, 100%, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"fade-down": {
		start: {
			opacity: 1,
			transform: "translate3d(0px, -100%, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"fade-left": {
		start: {
			opacity: 0,
			transform: "translate3d(-100%, 0px, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"fade-right": {
		start: {
			opacity: 0,
			transform: "translate3d(100%, 0px, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"slide-up": {
		start: {
			opacity: 0,
			transform: "translate3d(0px, 100%, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"slide-down": {
		start: {
			opacity: 0,
			transform: "translate3d(0px, -100%, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"slide-left": {
		start: {
			opacity: 0,
			transform: "translate3d(-100%, 0px, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"slide-right": {
		start: {
			opacity: 0,
			transform: "translate3d(100%, 0px, 0px)",
			ease: "power1.out",
		},
		end: {
			opacity: 1,
			transform: "translate3d(0px, 0px, 0px)",
			ease: "power1.out",
		},
	},
	"zoom": {
		start: {
			ease: "power1.out",
			opacity: 0,
			transform: "translate3d(-50%,-40%,0) scale3d(1.3, 1.3,1)",
		},
		end: {
			ease: "power1.out",
			opacity: 1,
			transform: "translate3d(-50%,-50%,0) scale3d(1, 1,1)",
		},
	},
};
const animationStyle = reactive({});
let hidden = $ref<boolean | null>();
onMounted(() => {
	hidden = show;
	gsap.set(animationStyle, {
		...transitions[name].start,
		duration: duration / 1000,
		ease,
	});
});

watch(
	() => show,
	() => {
		if (show) {
			gsap.to(animationStyle, {
				...transitions[name].end,
				ease,
				duration: duration / 1000,
				onStart() {
					hidden = true;
					sleep(200).then(() => {
						onStart();
					});
				},
			});
		} else {
			onComplete();
			gsap.to(animationStyle, {
				...transitions[name].start,
				ease,
				duration: duration / 1000,
				onComplete() {
					hidden = false;
				},
			});
		}
	}
);
const click = () => {
	emits("click");
};
const onStart = () => {
	emits("onStart");
};
const onComplete = () => {
	emits("onComplete");
};

const filterObject = (obj: { [key: string]: any }) => {
	if (obj?._gsap == undefined) return obj;

	const filtered = { ...obj };

	if (filtered._gsap) delete filtered._gsap;

	return filtered;
};
</script>

<script lang="ts">
export default {
	options: {
		virtualHost: true,
	},
};
</script>

<template>
	<div v-if="hidden" class="gy-transition" :style="{ ...filterObject(animationStyle), ...customStyle }" @click="click">
		<slot />
	</div>
</template>

<style scoped lang="less"></style>
