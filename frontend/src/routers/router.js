import { createRouter, createWebHashHistory } from "vue-router";

import Comprar from "../components/Comprar.vue";
import Home from "../components/Homes/Home.vue";
import Produto from "../components/Products/Product.vue";

const routes = [
	{ path: "/comprar", component: Comprar },
	{ path: "/home", component: Home },
	{ path: "/produtos", component: Produto },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

export default router;
