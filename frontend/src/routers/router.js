import { createRouter, createWebHistory } from "vue-router";

import Comprar from "../components/compras/Comprar.vue";
import Home from "../components/Homes/Home.vue";
import Cadastrar_Produto from "../components/products/Cadastrar_Produto.vue";
import Compras_Realizadas from "../components/compras/Compras_Realizadas.vue";
import Produtos_Cadastrados from "../components/products/Produtos_Cadastrados.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/comprar", component: Comprar },
	{ path: "/produtos", component: Cadastrar_Produto },
	{ path: "/compras_realizadas", component: Compras_Realizadas },
	{ path: "/produtos_cadastrados", component: Produtos_Cadastrados },
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;
