<template>
	<div id="App">
		<Header title="Familia Duental"></Header>
		<Content></Content>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from "./components/templates/Header.vue";
import Content from "./components/templates/Content.vue";
import Footer from "./components/templates/Footer.vue";

export default {
	nome: "App",
	components: { Footer, Header, Content },
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
	grid-template-rows: 50px 1fr 40px;
	grid-template-columns: 300px 1fr;
	grid-template-areas:
		"header header"
		"content content"
		"footer footer";
}
</style>
