<script lang="ts" setup>
import GyTip from "@/components/GyTip/index.vue";
import GyMessage from "@/components/GyMessage/index.vue";
import GyDialog from "@/components/GyDialog/index.vue";
const tipRef = $ref<InstanceType<typeof GyTip>>();
const messageRef = $ref<InstanceType<typeof GyMessage>>();
const dialogRef = $ref<InstanceType<typeof GyDialog>>();

const onClick = () => {
	tipRef?.ready(
		(): Promise<{
			status: string;
			message: string;
			code: number;
		}> => {
			return new Promise<any>(async (resolve, reject) => {
				await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000) + 1000)); // 随机延迟500ms到1500ms
				const successRate = Math.random();
				if (successRate > 0.5) {
					// 登录成功
					resolve({
						status: "success",
						message: "登录成功",
						code: 200,
					});
				} else {
					// 登录失败
					reject({
						status: "error",
						message: "登录失败，用户名或密码错误",
						code: -1,
					});
				}
			});
		},
		(res, openTip) => {
			if (res.code == 200) openTip("success", res.message);
			else openTip("error", res.message);
		}
	);
};
let latitudeAndLongitude = $ref<any>({});
const getLocationInformation = async () => {
	latitudeAndLongitude = await useLocation();
};
const { $sex } = $(
	useLoad("provide", {
		$name: "张三",
		$sex: 2,
		$openMessage: () => {
			messageRef?.open({
				type: "success",
				content: "success",
			});
		},
	})
);

const openDialog = () => {
	dialogRef?.open({
		content: "dialog组件",
	});
};
</script>

<template>
	<PageView isHeader header-bg-color="#fff0" navPosition="sticky" type="custom">
		<GyTip ref="tipRef" />
		<button @click="onClick">GyTip</button>
		<button @click="messageRef?.open({ type: 'success', content: 'success' })">GyMessage</button>
		<button @click="openDialog">GyDialog</button>
		<button @click="getLocationInformation">getlocation</button>

		{{ latitudeAndLongitude }}
		<div>{{ $sex }}</div>
	</PageView>
</template>

<style scoped lang="less"></style>
