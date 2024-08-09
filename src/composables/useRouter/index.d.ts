export interface PageStyle {
	navigationBarTitleText?: string;
	backgroundColor?: string;
	enablePullDownRefresh?: boolean;
	[key: string]: any;
}

export interface Page {
	path: string;
	type: "ordinary" | "tabBar";
	name: string;
	style: PageStyle;
	root?: string;

	[key: string]: any;

}

interface GlobalStyle {
	navigationBarTextStyle: string;
	navigationBarTitleText: string;
	navigationBarBackgroundColor: string;
	backgroundColor: string;
	[key: string]: any;
}

interface TabBarItem {
	pagePath: string;
	[key: string]: any;
}

export interface Route {
	pages: Page[];
	globalStyle: GlobalStyle;
	tabBar: {
		color: string;
		selectedColor: string;
		backgroundColor: string;
		[key: string]: string | Record<string, any>;
		list: TabBarItem[];
	};
	subPackages: {
		root: string;
		pages: Page[];
	}[];
	preloadRule: {
		[key: string]: {
			network: string;
			packages: string[];
		};
	};
}

