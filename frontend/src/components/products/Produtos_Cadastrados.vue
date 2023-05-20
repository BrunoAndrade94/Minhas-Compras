<template>
	<div class="produtos-cadastrados">
		<Page_Title
			icon="pi pi-fw pi-list"
			main_title="Produtos Cadastrados"
			sub_title="Lista de produtos!"
		/>
		<div class="card">
			<DataTable
				pageLinkSize="3"
				:value="produtos"
				showGridlines
				paginator
				:rows="10"
				tableStyle="min-width: 5rem"
			>
				<Column
					sortable
					v-for="coluna in colunas"
					:key="coluna.field"
					:field="coluna.field"
					:header="coluna.header"
				>
				</Column>

				<template #footer>
					A lista tem {{ produtos ? produtos.length : 0 }} produtos.
				</template>
			</DataTable>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { base_api_url } from "../../configs/databases/database_url";
import Page_Title from "../templates/Page_Title.vue";

export default {
	name: "Produtos_Cadastrados",
	components: { Page_Title },
	data() {
		return {
			produtos: [],
			colunas: [],
		};
	},
	created() {
		this.colunas = [
			{ field: "descricao", header: "Descrição" },
			{ field: "ultimo_valor", header: "Valor" },
			{ field: "data_ultimo_valor", header: "Comprado em" },
		];
	},
	watch: {},
	methods: {
		db_obter_produtos() {
			axios
				.get(`${base_api_url}produtos`)
				.then((res) => (this.produtos = res.data));
		},
		montar_tela() {
			this.db_obter_produtos();
		},
	},
	mounted() {
		this.montar_tela();
	},
};
</script>

<style></style>
