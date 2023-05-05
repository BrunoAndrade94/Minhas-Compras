<template>
	<footer class="footer">
		<span>Criado por <strong>Bruno de Carvalho</strong></span>
	</footer>
</template>

<script>
export default {
	nome: "Footer",
};
</script>

<style>
.footer {
	grid-area: footer;
	background-color: #ddd;
	color: #333;

	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 10px;
}
</style>
