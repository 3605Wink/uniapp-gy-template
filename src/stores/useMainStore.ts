// const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;
interface CardInfo {
	balance: number;
	cardId: string | null;
	cardName: string;
	cardNo: string;
	mchName: string;
	phone: string;
	placeName: string;
	state: number;
	cardType: string;
	placeId: string;
}
export default defineStore("main", {
	state: () => ({
		capsuleInfo: {} as UniApp.GetMenuButtonBoundingClientRectRes,
		windowInfo: {} as UniApp.GetSystemInfoResult,
		paymentParams: {} as Record<any, any>,
		provider: null as null | string,
		isrefreshInvoiceStatus: false as boolean,
		icCardPhone: null as string | null,
		icCardInformation: {} as CardInfo,
		alipayScanData: null as string | null,
		completedOrNot: false as boolean,
		isShow: false,
	}),
	actions: {
		setisShow() {
			this.isShow = true;
		},
		setCapsuleInfo() {
			this.capsuleInfo = uni.getMenuButtonBoundingClientRect();
			this.windowInfo = uni.getSystemInfoSync();
		},
		setAlipayScanData(value: string) {
			this.alipayScanData = value;
		},
		setCodePrice(data: Record<any, any>) {
			this.paymentParams = data;
		},
		getProvider() {
			// WECHAT :微信小程序
			// ALIPAY :支付宝小程序
			// PC :支付宝小程序
			// OTHER :其它客户端
			// #ifdef APP-PLUS
			this.provider = "OTHER";
			// #endif
			// #ifdef MP-WEIXIN
			this.provider = "WECHAT";
			// #endif
			// #ifdef MP-ALIPAY
			this.provider = "ALIPAY";
			// #endif
		},
		async setRefreshInvoiceStatus(status: boolean) {
			this.isrefreshInvoiceStatus = status;
		},
		setIcCardPhone(phone: string) {
			this.icCardPhone = phone;
		},
		setIcCardInformation(data: CardInfo) {
			this.icCardInformation = data;
		},
		setCompletedOrNot() {
			this.completedOrNot = true;
		},
	},
	getters: {},
	// persist: true,
	persist: {
		excludes: ["alipayScanData", "articleAddress", "completedOrNot", "icCardPhone", "setTabBarCurrentIndex"],
	},
});
