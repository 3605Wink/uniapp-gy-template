import router from "@/router/index.json";

export const getPageView = (route: any) => {
	const pathList = router.subPackages
		? [
				...router.pages,
				...router.subPackages.flatMap((item: any) =>
					item?.pages.map(page => ({
						...page,
						path: `${item?.root}/${page.path}`,
					}))
				),
		  ]
		: router.pages;

	return route.map(item => {
		let res: any = pathList.find(sub_item => sub_item?.path == item.route);
		return {
			name: res?.name,
			title: res?.style?.navigationBarTitleText,
			path: res?.path,
			options: item?.options,
		};
	});
};
