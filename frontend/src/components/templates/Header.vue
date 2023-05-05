<template>
	<div class="header"></div>
</template>

<script>
export default {
	nome: "Header",
};
</script>

<style>
.header {
	grid-area: header;
	background: linear-gradient(to right, #1e469a, #49a7c1);

	color: #333;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 10px;
}
</style>
