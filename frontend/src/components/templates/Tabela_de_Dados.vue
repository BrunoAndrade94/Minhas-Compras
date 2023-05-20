<template>
	<div class="tabela-de-dados">
		<Datatable
			selectionMode="single"
			pageLinkSize="3"
			:rows="max_linhas"
			showGridlines
			paginator
			tableStyle="min-width: 5rem"
			@rowSelect="linha_selecionada"
			:value="compras_db"
		>
			<Column> </Column>
		</Datatable>
	</div>
</template>

<script>
export default {
	name: "Tabela_de_Dados",
	props: {},
	data() {
		return {
			max_linhas: 10,
		};
	},
};
</script>

<style></style>
