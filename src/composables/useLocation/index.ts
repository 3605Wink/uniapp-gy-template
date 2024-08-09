export const useLocation = (): Promise<{
	longitude: number | undefined;
	latitude: number | undefined;
	code?: string | undefined;
	city?: string | undefined;
}> => {
	return new Promise((resolve, reject) => {
		let longitude: number | undefined;
		let latitude: number | undefined;
		let city: string | undefined;
		let code: string | undefined;
		// #ifdef MP-WEIXIN
		uni.getLocation({
			type: "gcj02",
			success: async (weixinLocation: any) => {
				const { longitude, latitude } = weixinLocation;
				resolve({ longitude, latitude });
			},
			fail: reject,
		});
		// #endif

		// #ifdef MP-ALIPAY
		my.getLocation({
			type: 1,
			success: (alipayLocation: any) => {
				city = alipayLocation.city.slice(0, 2);
				code = `${alipayLocation.cityAdcode.slice(0, 4)}00000000`;
				longitude = alipayLocation.longitude;
				latitude = alipayLocation.latitude;
				resolve({ city, longitude, latitude, code });
			},
			fail: reject,
		});
		// #endif
	});
};
