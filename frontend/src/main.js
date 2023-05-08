import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Store from "./stores/store";
import Router from "./routers/router";

// components primevue
import {
	Toast,
	ToastService,
	InputSwitch,
	InputText,
	Button,
	TreeSelect,
	Sidebar,
	InputNumber,
	InputMask,
	Listbox,
} from "./configs/primevue/components.js";
import "./configs/primevue/themes.js";
import "./configs/styles/global.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(Store);
app.use(Router);

app.component("InputSwitch", InputSwitch);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("InputText", InputText);
app.component("TreeSelect", TreeSelect);
app.component("Sidebar", Sidebar);
app.component("InputNumber", InputNumber);
app.component("Listbox", Listbox);

app.mount("#app");
