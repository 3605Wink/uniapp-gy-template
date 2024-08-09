<script lang="ts" setup>
// #ifdef MP-WEIXIN
let privacyContractName = $ref("");
let show = $ref(false);

onMounted(() => {
	wx.getPrivacySetting({
		success: res => {
			privacyContractName = res.privacyContractName;
			if (res.needAuthorization) show = true;
		},
		fail: () => {},
		complete: () => {},
	});
});

const exitMiniProgram = () => {
	uni.exitMiniProgram();
};

const onClick = () => {
	show = false;
	getCurrentLocation();
};

const openPrivacyContract = () => {
	wx.openPrivacyContract({});
};
// #endif
</script>

<template>
	<!-- #ifdef MP-WEIXIN -->
	<GyOverlay :show="show" :z-index="999999999">
		<div class="content">
			<div class="title">隐私保护指引</div>
			<div class="des">
				在使用当前小程序服务之前，请仔细阅读
				<text class="link" @click="openPrivacyContract">{{ privacyContractName }}</text>
				。如你同意{{ privacyContractName }}，请点击“同意”开始使用。
			</div>
			<div class="btns">
				<button class="item reject" @click="exitMiniProgram">拒绝</button>
				<button
					id="agree-btn"
					class="item agree"
					open-type="agreePrivacyAuthorization"
					@agreeprivacyauthorization="onClick"
				>
					同意
				</button>
			</div>
		</div>
	</GyOverlay>
	<!-- #endif -->
</template>

<style lang="less" scoped>
@content-width: 632rpx;
@padding-size: 48rpx;
@border-radius-size: 16rpx;
@main-color: #333;
@secondary-color: #666;
@link-color: #07c160;
@background-white: #fff;
@gray-light: #f4f4f5;
@gray-darker: #909399;

.content {
	position: absolute;
	top: 50%;
	left: 50%;
	box-sizing: border-box;
	width: @content-width;
	padding: @padding-size;
	transform: translate(-50%, -50%);
	border-radius: @border-radius-size;
	background: @background-white;

	.title {
		color: @main-color;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}

	.des {
		margin-top: 40rpx;
		color: @secondary-color;
		font-size: 26rpx;
		line-height: 1.6;
		text-align: justify;

		.link {
			color: @link-color;
			text-decoration: underline;
		}
	}
}

.btns {
	display: flex;
	justify-content: space-between;
	margin-top: @padding-size;

	.item {
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		width: 244rpx;
		height: 80rpx;
		margin: 0;
		border: none;
		border-radius: @border-radius-size;

		&.reject {
			background: @gray-light;
			color: @gray-darker;
		}

		&.agree {
			background: @link-color;
			color: @background-white;
		}
	}
}
</style>
