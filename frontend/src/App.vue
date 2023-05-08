<template>
	<div id="App" :class="{ 'hide-menu': !is_menu_visible }">
		<Header title="Familia Duental" :hide_toggle="false" />
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/templates/Header.vue";
import Menu from "./components/templates/Menu.vue";
import Content from "./components/templates/Content.vue";
import Footer from "./components/templates/Footer.vue";
import Comprar from "./components/Comprar.vue";

export default {
	nome: "App",
	components: { Comprar, Footer, Header, Content, Menu },
	computed: mapState(["is_menu_visible"]),
};
</script>

<style>
body {
	margin: 0;
}

#App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100vh;
	display: grid;
	grid-template-rows: 40px 1fr 40px;
	grid-template-columns: 300px 1fr;
	grid-template-areas:
		"header header"
		"menu content"
		"menu footer";
}

#App.hide-menu {
	grid-template-areas:
		"header header"
		"content content"
		"footer footer";
}
</style>
