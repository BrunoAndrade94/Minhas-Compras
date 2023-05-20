// import vue
import { createApp } from "vue";
import App from "./App.vue";

// import proprios
import Store from "./stores/store";
import Router from "./routers/router";

// imports prime vue
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import {
	InputNumber,
	InputSwitch,
	InputText,
	Button,
	TreeSelect,
	Sidebar,
	Listbox,
	Toast,
	ConfirmDialog,
	TabMenu,
	Menubar,
	Column,
	DataTable,
	ColumnGroup,
	Row,
	Chart,
	Fieldset,
	SelectButton,
} from "./configs/primevue/components.js";
import "./configs/primevue/themes.js";
import "./configs/styles/global2.css";

const app = createApp(App);

// app.use
{
	app.use(PrimeVue);
	app.use(ToastService);
	app.use(ConfirmationService);
	app.use(Store);
	app.use(Router);
}

// componentes
{
	app.component("InputSwitch", InputSwitch);
	app.component("InputNumber", InputNumber);
	app.component("InputText", InputText);
	app.component("Button", Button);
	app.component("TreeSelect", TreeSelect);
	app.component("Sidebar", Sidebar);
	app.component("Listbox", Listbox);
	app.component("Toast", Toast);
	app.component("ConfirmDialog", ConfirmDialog);
	app.component("TabMenu", TabMenu);
	app.component("Menubar", Menubar);
	app.component("Column", Column);
	app.component("DataTable", DataTable);
	app.component("ColumnGroup", ColumnGroup);
	app.component("Row", Row);
	app.component("Chart", Chart);
	app.component("Fieldset", Fieldset);
	app.component("SelectButton", SelectButton);
}

app.mount("#app");
