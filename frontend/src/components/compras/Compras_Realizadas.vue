<template>
	<div class="compras-realizadas">
		<Page_Title
			icon="pi pi-cart-plus"
			main_title="Compras Realizadas"
			sub_title="Consulte aqui a sua compra!"
		/>
		<div class="card">
			<div v-if="compra_selecionada.length < 1">
				<DataTable
					selectionMode="single"
					@rowSelect="linha_selecionada"
					:value="compras_db"
					pageLinkSize="3"
					showGridlines
					paginator
					:rows="10"
					tableStyle="min-width: 5rem"
				>
					<Column
						sortable
						v-for="coluna in colunas_compras"
						:key="coluna.field"
						:field="coluna.field"
						:header="coluna.header"
					></Column>

					<template #footer>
						A lista tem
						{{ compras_db ? compras_db.length : 0 }} compras.
					</template>
				</DataTable>
			</div>

			<div v-if="compra_selecionada.length > 0">
				<DataTable
					:value="compra_selecionada"
					pageLinkSize="3"
					showGridlines
					paginator
					:rows="10"
					tableStyle="min-width: 5rem"
				>
					<Column
						sortable
						v-for="coluna in colunas_produtos"
						:key="coluna.field"
						:field="coluna.field"
						:header="coluna.header"
					></Column>

					<template #footer>
						<span
							style="margin-bottom: -20px; display: flex"
							class="texto-footer"
						>
							<span>
								A lista tem
								{{
									compra_selecionada
										? compra_selecionada.length
										: 0
								}}
								produtos.
							</span>

							<span style="margin-top: -25px; text-align: end">
								Valor Total R$
								{{ compra_atual.valor_total_compra }}
							</span>

							<span class="botao-footer">
								<Button
									rounded
									severity="info"
									@click="fn_botao_voltar()"
								>
									<i class="pi pi-fw pi-angle-left"> </i>
								</Button>

								<Button
									rounded
									severity="danger"
									@click="fn_botao_deletar_compra()"
								>
									<i class="pi pi-fw pi-trash"> </i>
								</Button>
							</span>
						</span>
					</template>
				</DataTable>
				<ConfirmDialog />
				<Toast />
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import Page_Title from "../templates/Page_Title.vue";
import { base_api_url } from "../../configs/databases/database_url";

export default {
	name: "Compras_Realizadas",

	components: { Page_Title },

	data() {
		return {
			compras_db: [],
			compra_atual: null,
			compra_selecionada: [],
			colunas_compras: null,
			colunas_produtos: null,
		};
	},

	watch: {},

	methods: {
		async linha_selecionada(event) {
			this.compra_atual = event.data;
			// await obter_compra_com_produtos_no_db(compra_atual.id_compra);
			await axios
				.get(
					`${base_api_url}compra-e-produtos/${this.compra_atual.id_compra}`
				)
				.then((res) => {
					this.compra_selecionada = res.data;
				});
		},
		async obter_compra_com_produtos_no_db(id) {
			await axios
				.get(`${base_api_url}compra-e-produtos/${id}`)
				.then((res) => {
					this.compra_selecionada = res.data;
				});
		},
		fn_botao_voltar() {
			this.limpar_tela();
			this.fn_obter_compras_no_db();
		},
		fn_botao_deletar_compra() {
			this.$confirm.require({
				message: "Deseja apagar a compra?",
				header: "A compra não será mais acessada!",
				acceptLabel: "Sim",
				rejectLabel: "Não",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					//
					this.fn_deletar_compra_db();
					//
					this.fn_botao_voltar();
					//
					this.$toast.add({
						severity: "info",
						summary: "Compra apagada!",
						life: 3333,
					});
				},
				reject: () => {
					this.$toast.add({
						severity: "error",
						summary: "Compra não apagada!",
						life: 3333,
					});
				},
			});
		},
		fn_deletar_compra_db() {
			axios.delete(
				`${base_api_url}compras/${this.compra_atual.id_compra}`
			);
		},
		montar_tela() {
			this.fn_obter_compras_no_db();
			this.limpar_tela();
		},
		fn_obter_compras_no_db() {
			axios.get(`${base_api_url}compras-realizadas`).then((res) => {
				this.compras_db = res.data;
			});
		},
		limpar_tela() {
			this.compra_selecionada = [];
			this.compra_atual = [];
			this.compras_db = [];
		},
	},

	created() {
		this.colunas_compras = [
			{ field: "id_compra", header: "ID" },
			{ field: "quantidade_produtos", header: "Produtos" },
			{ field: "valor_total_compra", header: "Valor" },
			{ field: "data_da_compra", header: "Data" },
		];
		this.colunas_produtos = [
			{ field: "descricao", header: "Produto" },
			{ field: "quantidade_produto", header: "Quantidade" },
			{ field: "valor_unitario_produto", header: "Valor Unitário" },
			{ field: "valor_total_produto", header: "Valor Total Produto" },
		];
	},

	mounted() {
		this.montar_tela();
	},
};
</script>

<style>
.texto-footer {
	display: flex;
	flex-direction: column;
	text-align: start;
}

.botao-footer {
	flex-direction: row;
	align-items: start;
	text-align: center;
	margin: 10px;
}

.botao-footer Button {
	margin: 5px;
}
</style>
