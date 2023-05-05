<template>
	<div id="App">
		<Header />
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Header from "./components/templates/Header.vue";
import Menu from "./components/templates/Menu.vue";
import Content from "./components/templates/Content.vue";
import Footer from "./components/templates/Footer.vue";

export default {
	nome: "App",
	components: { Header, Menu, Content, Footer },
};
</script>

<style>
* {
	font-family: "Roboto", sans-serif;
}

body {
	margin: 0;
}

#App {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100vh;
	display: grid;
	grid-template-rows: 60px 1fr 40px;
	grid-template-columns: 300px 1fr;
	grid-template-areas:
		"header header"
		"menu content"
		"menu footer";
}
</style>
