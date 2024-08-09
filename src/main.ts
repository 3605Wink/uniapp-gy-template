import { createSSRApp } from "vue";
import persist from "@wsvaio/pinia-plugin-persist";
import { createPinia } from "pinia";
import App from "./App.vue";
import GyMessage from "./components/GyMessage/index.vue";
import GyDialog from "./components/GyDialog/index.vue";
import privacyModal from "./components/privacyModal/index.vue";

export const createApp = () => {
	const app = createSSRApp(App);
	app.component("GyMessage", GyMessage);
	app.component("GyDialog", GyDialog);
	app.component("privacyModal", privacyModal);

	const pinia = createPinia();
	pinia.use(
		persist({
			getter: key => {
				return uni.getStorageSync(key);
			},
			setter: (key, value) => {
				uni.setStorageSync(key, value);
			},
		})
	);

	app.use(pinia);

	return {
		app,
		pinia,
	};
};
