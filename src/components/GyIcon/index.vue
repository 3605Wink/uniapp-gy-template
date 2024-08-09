<script lang="ts" setup>
const {
	name,
	color = "#252525",
	bold,
	size = 16,
} = defineProps<{
	name: string;
	color?: string;
	bold?: boolean;
	size?: string | number;
}>();
const emits = defineEmits(["click"]);
const click = () => {
	emits("click");
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
	<div
		class="icon"
		:style="{
			'--icon-size': `${Number(size) * 2}rpx`,
		}"
		@click="click"
	>
		<template v-if="name?.includes('/')">
			<image mode="aspectFit" :src="name" class="icon-img" />
		</template>
		<template v-else>
			<view
				class="icon-img"
				:class="[`${name}`]"
				:style="{
					[color.includes('gradient') ? 'background' : 'background-color']: color,
				}"
			/>
		</template>
	</div>
</template>

<style scoped lang="less">
.signal-value {
	--un-icon: url("data:image/svg+xml;utf8,<svg  viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M9.44173 6.94482C8.52126 6.94482 7.77507 7.69102 7.77507 8.61149V15.8337C7.77507 16.7542 8.52126 17.5004 9.44173 17.5004H10.5501C11.4705 17.5004 12.2167 16.7542 12.2167 15.8337V8.61149C12.2167 7.69102 11.4705 6.94482 10.5501 6.94482H9.44173Z' fill='currentColor'/><path d='M4.16667 10.6476C3.24619 10.6476 2.5 11.3938 2.5 12.3143V15.8328C2.5 16.7533 3.24619 17.4995 4.16667 17.4995H5.275C6.19547 17.4995 6.94167 16.7533 6.94167 15.8328V12.3143C6.94167 11.3938 6.19548 10.6476 5.275 10.6476H4.16667Z' fill='currentColor'/><path d='M14.725 2.5C13.8045 2.5 13.0583 3.24619 13.0583 4.16667V15.8333C13.0583 16.7538 13.8045 17.5 14.725 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5H14.725Z' fill='currentColor' fill-opacity='0.2'/></svg>");
	-webkit-mask: var(--un-icon) no-repeat;
	mask: var(--un-icon) no-repeat;
	-webkit-mask-size: 100% 100%;
	mask-size: 100% 100%;
	background-color: currentColor;
	color: inherit;
	display: inline-block;
	vertical-align: middle;
	width: 1em;
	height: 1em;
}

.signal-value-plus {
	--un-icon: url("data:image/svg+xml;utf8,<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M9.44173 6.94482C8.52126 6.94482 7.77507 7.69102 7.77507 8.61149V15.8337C7.77507 16.7542 8.52126 17.5004 9.44173 17.5004H10.5501C11.4705 17.5004 12.2167 16.7542 12.2167 15.8337V8.61149C12.2167 7.69102 11.4705 6.94482 10.5501 6.94482H9.44173Z' fill='currentColor'/><path d='M4.16667 10.6476C3.24619 10.6476 2.5 11.3938 2.5 12.3143V15.8328C2.5 16.7533 3.24619 17.4995 4.16667 17.4995H5.275C6.19547 17.4995 6.94167 16.7533 6.94167 15.8328V12.3143C6.94167 11.3938 6.19548 10.6476 5.275 10.6476H4.16667Z' fill='currentColor'/><path d='M14.725 2.5C13.8045 2.5 13.0583 3.24619 13.0583 4.16667V15.8333C13.0583 16.7538 13.8045 17.5 14.725 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5H14.725Z' fill='currentColor'/></svg>");
	-webkit-mask: var(--un-icon) no-repeat;
	mask: var(--un-icon) no-repeat;
	-webkit-mask-size: 100% 100%;
	mask-size: 100% 100%;
	background-color: currentColor;
	color: inherit;
	display: inline-block;
	vertical-align: middle;
	width: 1em;
	height: 1em;
}
.icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: var(--icon-size);
	height: var(--icon-size);
	overflow: hidden;
}

.icon-img {
	width: var(--icon-size);
	height: var(--icon-size);
	transition: all 0.2s;
}
</style>
