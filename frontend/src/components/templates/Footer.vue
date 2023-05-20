<template>
	<footer class="footer">
		<span
			>Criado com <i class="pi pi-heart-fill" /> por
			<strong> Bruno de Carvalho</strong></span
		>
	</footer>
</template>

<script>
export default {
	name: "Footer",
};
</script>

<style>
.footer {
	grid-area: footer;
	background-color: #325961;
	color: #e27c7c;

	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 10px;
}
</style>
