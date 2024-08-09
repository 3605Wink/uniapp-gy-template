<script lang="ts" setup>
const {
	show = false,
	zIndex = 999,
	opacity = "0.7",
} = defineProps<{
	show: boolean;
	zIndex?: number;
	opacity?: string;
}>();
const emits = defineEmits(["close", "complete", "start", "update:show"]);

const close = () => {
	emits("close");
};

const start = () => {
	emits("start");
};
const complete = () => {
	emits("complete");
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
	<GyTransition
		:show="show"
		:custom-style="{
			zIndex,
			backgroundColor: `rgba(0,0,0,${opacity})`,
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
		}"
		@click="close"
		@touchmove.stop.prevent
		@on-complete="complete"
		@on-start="start"
	>
		<div class="overlay" @click.stop>
			<slot />
		</div>
	</GyTransition>
</template>

<style scoped lang="less">
// .overlay {
// 	pointer-events: auto;
// }
</style>
