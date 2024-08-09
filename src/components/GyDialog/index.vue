<!-- eslint-disable @typescript-eslint/ban-types -->
<script lang="ts" setup>
import { merge } from "@wsvaio/utils";
import gsap from "gsap";

type Colse = typeof close;
const emits = defineEmits<{
	(e: "cancel"): void;
	(e: "confirm", close: Colse | Function): void;
}>();

let show = $ref<boolean>(false);
let modalStyle = reactive({
	opacity: 0,
	transform: "translate3d(-50%,-40%,0) scale3d(1.3, 1.3,1)",
});
interface Params {
	title?: string;
	content?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	hideCancel?: boolean;
	hideConfirm?: boolean;
	hideBottomBar?: boolean;
	cancelClosesDialog?: boolean;
	confirmClosesDialog?: boolean;
	overlayClose?: boolean;
	success?: Function;
	confirm?: Function;
	cancel?: Function;
	customStyle?: Record<any, any>;
	headerStyle?: Record<any, any>;
}

let params = reactive<Params>({
	title: "提示",
	content: "",
	confirmLabel: "确定",
	cancelLabel: "取消",
	hideCancel: false,
	hideConfirm: false,
	hideBottomBar: false,
	cancelClosesDialog: true,
	confirmClosesDialog: true,
	overlayClose: false,
	customStyle: {},
	headerStyle: {},
	success: () => {},
});

const open = (event?: Params) => {
	return new Promise((resolve, reject) => {
		gsap.to(modalStyle!, {
			duration: 0.2,
			opacity: 1,
			transform: "translate3d(-50%,-50%,0) scale3d(1, 1,1)",
			onStart() {
				merge(params, event!);
				show = true;
			},
		});
	}).then(() => {
		setTimeout(() => {
			if (typeof event?.success === "function") event.success();
		}, 300);
	});
};
const close = (success?: Function) => {
	return new Promise((resolve, reject) => {
		gsap.to(modalStyle!, {
			duration: 0.2,
			opacity: 0,
			transform: "translate3d(-50%,-40%,0) scale3d(1.3, 1.3,1)",
			onStart() {
				show = false;
				resolve("success");
			},
		});
	}).then(() => {
		setTimeout(() => {
			if (typeof success === "function") success();
		}, 300);
	});
};

const confirm = (event?: Function) => {
	if (params?.cancelClosesDialog) close();
	emits("confirm", close);
	typeof event === "function" && event?.();
};

const cancel = (event?: Function) => {
	if (params?.cancelClosesDialog) close();
	emits("cancel");
	typeof event === "function" && event?.();
};

const overlayCancel = () => {
	if (!params?.overlayClose) emits("cancel");
};

defineExpose({
	open,
	close,
	cancel,
	confirm,
});
</script>

<script lang="ts">
export default {
	options: {
		virtualHost: true,
	},
};
</script>

<template>
	<gy-overlay :z-index="99999999" :show="show" @close="overlayCancel">
		<div class="gy-modal" :style="filterObject(modalStyle)">
			<div class="gy-modal--header" :style="params.headerStyle">
				<slot name="header">
					{{ params?.title }}
				</slot>
			</div>

			<div class="gy-modal--body" :style="params.customStyle">
				<slot name="default">
					<p>{{ params?.content }}</p>
				</slot>
			</div>

			<slot name="footer">
				<div v-if="!params?.hideBottomBar" class="gy-modal--footer">
					<button v-if="!params?.hideCancel" class="gy-modal--footer_close" @click="cancel">
						{{ params?.cancelLabel }}
					</button>
					<button v-if="!params?.hideConfirm" class="gy-modal--footer_confirm" @click="confirm">
						{{ params?.confirmLabel }}
					</button>
				</div>
			</slot>
		</div>
	</gy-overlay>
</template>

<style scoped lang="less">
.gy-modal {
	display: flex;
	position: absolute;
	z-index: 9999999999;
	top: 50%;
	left: 50%;
	flex-direction: column;
	align-items: center;
	min-width: 226px;
	min-height: 126px;
	padding: 16px 24px;
	overflow: hidden;
	border-radius: 8px;
	background-color: #fff;
	font-size: 0;
	gap: 12px;

	&--header {
		display: block;
		width: 100%;
		height: 20px;
		overflow: hidden;
		color: #191919;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&--body {
		flex: 1;
		width: 100%;
		max-height: 268px;
		margin: 8px 0;
		overflow: auto;
		color: #808080;
		font-size: 12px;
		line-height: 20px;
		text-align: center;
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
	}

	&--footer {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;

		&_close,
		&_confirm {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			min-width: 100px;
			height: 40px;
			margin: 0 8px;
			padding: 6px 0;
			border-radius: 20px;
			font-size: 14px;
			font-weight: 500;
		}

		&_close {
			border: 1px solid #328efe;
			background-color: rgb(255 255 255);
			color: #328efe;
		}

		&_confirm {
			border: 1px solid #328efe;
			background-color: #328efe;
			color: #fff;
		}
	}
}
</style>
