<template>
	<div class="comprar">
		<Page_Title
			icon="pi pi-cart-plus"
			main_title="Nova Compra"
			sub_title="Realize aqui sua compra!"
		/>
		<div class="div-compra">
			<div class="div-id-compra">
				<label>ID da Compra</label>
				<InputNumber v-model="id_nova_compra" disabled />

				<label>Número de Produtos</label>
				<InputNumber
					suffix=" produto(s)"
					v-model="total_de_produtos_compra"
					disabled
				/>
			</div>

			<div>
				<Listbox
					filter
					style="margin: 10px 10px"
					v-if="mostrar_tabela_de_produtos_db"
					filterPlaceholder="Qual produto?"
					emptyFilterMessage="Não encontrei nada"
					:options="produto_db"
					optionLabel="descricao"
					v-model="produto_temporario"
					listStyle="max-height:250px"
				/>
			</div>

			<div>
				<Listbox
					v-if="mostrar_tabela_de_produtos_cliente"
					:options="produto_cliente"
					optionLabel="descricao"
					listStyle="max-height:250px"
					style="margin: 10px 10px"
				/>
			</div>

			<div v-if="!mostrar_tabela_de_produtos_db" class="div-valor-total">
				<label>Produto</label>
				<InputText
					:disabled="mostrar_tabela_de_produtos_cliente"
					v-if="!mostrar_tabela_de_produtos_db"
					type="text"
					v-model="produto_temporario.descricao"
					@click="fn_escolher_produto()"
				/>

				<label v-if="!mostrar_tabela_de_produtos_db"
					>Último Valor</label
				>
				<InputNumber
					v-if="!mostrar_tabela_de_produtos_db"
					v-model="produto_temporario.ultimo_valor"
					mode="currency"
					currency="BRL"
					locale="pt-BR"
					disabled
				/>

				<div
					v-if="produto_temporario.ultimo_valor > 0"
					class="div-valor-total"
				>
					<label>Quantidade</label>
					<InputNumber
						:maxFractionDigits="3"
						:disabled="false"
						v-model="produto_temporario.quantidade"
						:min="0"
					/>
				</div>

				<div
					v-if="produto_temporario.quantidade > 0"
					class="div-valor-total"
				>
					<label>Novo Valor</label>
					<InputNumber
						:disabled="desabilitar_input_number"
						v-model="produto_temporario.novo_valor"
						mode="currency"
						currency="BRL"
						locale="pt-BR"
					/>
				</div>

				<label>Valor Total</label>
				<InputNumber
					v-model="produto_temporario.valor_total"
					mode="currency"
					currency="BRL"
					locale="pt-BR"
					disabled
				/>
			</div>

			<div class="botoes">
				<Button
					style="margin-top: 5px"
					:disabled="desabilitar_botao_incluir_produto"
					:badge="total_de_produtos_compra"
					icon="pi pi-plus"
					label="Incluir Produto"
					severity="success"
					rounded
					raised
					@click="fn_botao_incluir_produto()"
				></Button>
				<Button
					v-if="total_de_produtos_compra > 0"
					raised
					:disabled="mostrar_tabela_de_produtos_db"
					rounded
					severity="info"
					icon="pi pi-box"
					:label="texto_do_botao_ver_produtos_cliente"
					@click="fn_botao_mostrar_produtos_cliente()"
				></Button>
				<Button
					v-if="total_de_produtos_compra > 0"
					raised
					rounded
					severity="danger"
					icon="pi pi-money-bill"
					label="Finalizar Compra"
					@click="fn_botao_finalizar_compra()"
				></Button>
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
	name: "Comprar",

	components: { Page_Title },

	data() {
		return {
			//
			// EM USO
			//
			id_nova_compra: 0,
			valor_total_compra: null,
			total_de_produtos_compra: "",
			//

			//
			// ANALISAR POSTERIORMENTE E RETIRAR
			//
			valor_total: null,
			compra: [],
			produto: [],
			//

			//
			// REFATORADAS E OK
			//
			produto_db: [],
			compra_cliente: [],
			produto_cliente: [],
			produto_temporario: [],

			desabilitar_botao: true,
			desabilitar_input_number: true,
			mostrar_tabela_de_produtos_db: false,
			desabilitar_botao_incluir_produto: true,
			mostrar_tabela_de_produtos_cliente: false,

			texto_do_botao_ver_produtos_cliente: "Ver Produtos(s)",
		};
	},

	computed: {},

	watch: {
		//
		// TESTADO E FUNCIONANDO >
		//
		produto_temporario() {
			this.mostrar_tabela_de_produtos_db = false;
		},
		//
		"produto_temporario.quantidade": function () {
			this.fn_calcular_valor_total_do_produto();
		},
		"produto_temporario.novo_valor": function () {
			this.fn_calcular_valor_total_do_produto();
		},
		"produto_temporario.ultimo_valor": function () {
			// if (this.produto_temporario.ultimo_valor > 0.0) {
			// 	this.desabilitar_botao_incluir_produto = false;
			// } else {
			// 	this.desabilitar_botao_incluir_produto = true;
			// }
		},
		"produto_temporario.valor_total": function () {
			if (this.produto_temporario.valor_total > 0.0) {
				this.desabilitar_botao_incluir_produto = false;
			} else {
				this.desabilitar_botao_incluir_produto = true;
			}
		},
		//
		// TESTADO E FUNCIONANDO <
		//

		//
		// EM TESTES
		//
		total_de_produtos_compra() {
			// if (this.produto_cliente.length === 1) {
			if (this.total_de_produtos_compra === 0) {
				this.desabilitar_botao = true;
			} else if (this.total_de_produtos_compra > 1) {
				// } else if (this.produto_cliente.length > 1) {
				this.desabilitar_botao = false;
			}
		},
	},

	methods: {
		fn_calcular_valor_total_do_produto() {
			const novo_valor = this.produto_temporario.novo_valor;
			const quantidade = this.produto_temporario.quantidade;
			const ultimo_valor = this.produto_temporario.ultimo_valor;

			const atribuir_valor_unitario = (valor_unitario) => {
				this.produto_temporario.valor_unitario = valor_unitario;
			};

			if (novo_valor === undefined || novo_valor === null) {
				this.produto_temporario.valor_total = (
					quantidade * ultimo_valor
				).toFixed(2);
				//
				atribuir_valor_unitario(ultimo_valor);
			} else if (novo_valor > 0) {
				//
				this.produto_temporario.valor_total = (
					quantidade * novo_valor
				).toFixed(2);
				//
				atribuir_valor_unitario(novo_valor);
			}
		},

		fn_escolher_produto() {
			this.mostrar_tabela_de_produtos_db = true;
			this.fn_obter_produtos_no_banco_de_dados();
		},

		fn_finalizar_compra() {
			const compra = {
				id_compra: this.id_nova_compra,
				valor_total_compra: this.valor_total_compra.toFixed(2),
				quantidade_produtos: this.total_de_produtos_compra,
			};
			axios.post(`${base_api_url}compras-realizadas/`, compra);

			this.id_nova_compra = 0;
			this.valor_total_compra = null;
			this.total_de_produtos_compra = "";
			this.produto_temporario = [];
			this.fn_montar_tela();
		},

		fn_botao_mostrar_produtos_cliente() {
			if (this.mostrar_tabela_de_produtos_cliente) {
				this.desabilitar_botao = false;
				this.mostrar_tabela_de_produtos_cliente = false;
				this.texto_do_botao_ver_produtos_cliente = "Ver Produtos(s)";
			} else {
				this.desabilitar_botao = true;
				this.mostrar_tabela_de_produtos_cliente = true;
				this.texto_do_botao_ver_produtos_cliente =
					"Esconder Produtos(s)";
			}
		},

		fn_botao_finalizar_compra() {
			this.$confirm.require({
				message: "Deseja finalizar a compra?",
				header: "Uma nova compra será iniciada!",
				acceptLabel: "Sim",
				rejectLabel: "Não",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					//
					this.fn_finalizar_compra();
					//
					this.$toast.add({
						severity: "info",
						summary: "Compra finalizada!",
						detail: "Nova compra iniciada!",
						life: 3333,
					});
				},
				reject: () => {
					this.$toast.add({
						severity: "error",
						summary: "Compra não finalizada!",
						detail: "Nova compra não iniciada!",
						life: 3333,
					});
				},
			});
		},

		fn_botao_incluir_produto() {
			this.$confirm.require({
				message: "Deseja realmente comprar este item?",
				header: "Produto será adicionado no carrinho",
				acceptLabel: "Sim",
				rejectLabel: "Não",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					this.fn_incluir_produto_na_compra();
					this.$toast.add({
						severity: "info",
						summary: "Confirmado!",
						detail: "Produto comprado.",
						life: 3000,
					});
					this.fn_obter_produtos_no_banco_de_dados();
					this.fn_limpar_tela();
				},
				reject: () => {
					this.$toast.add({
						severity: "error",
						summary: "Cancelado!",
						detail: "Você não comprou.",
						life: 3000,
					});
				},
			});
		},

		fn_incluir_produto_na_compra() {
			this.total_de_produtos_compra++;

			this.valor_total_compra += Number(
				this.produto_temporario.valor_total
			);

			this.produto_cliente.push(this.produto_temporario);

			const incluir_produto_na_compra = {
				id_compra: this.id_nova_compra,
				id_produto: this.produto_temporario.id_produto,
				quantidade_produto: this.produto_temporario.quantidade,
				valor_unitario_produto: this.produto_temporario.valor_unitario,
				valor_total_produto: this.produto_temporario.valor_total,
			};

			this.produto_temporario = [];
			this.produto_db = [];

			axios
				.post(`${base_api_url}compras`, incluir_produto_na_compra)
				.then();
		},

		fn_montar_tela() {
			this.fn_obter_produtos_no_banco_de_dados();
			this.fn_obter_ultima_compra();
			this.fn_limpar_tela();
		},
		fn_obter_produtos_no_banco_de_dados() {
			axios.get(`${base_api_url}produtos`).then((res) => {
				this.produto_db = res.data;
			});
		},
		fn_obter_ultima_compra() {
			axios.get(`${base_api_url}ultima`).then((res) => {
				this.id_nova_compra = res.data.id_compra + 1;
			});
		},
		fn_limpar_tela() {
			this.mostrar_tabela_de_produtos_cliente = false;
			this.produto_temporario = [];
			this.produto_db = [];
		},
	},

	mounted() {
		// this.produto_cliente = [];
		this.fn_montar_tela();
	},
};
</script>

<style>
.comprar {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.div-valor-total {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.div-id-compra {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.div-compra {
	display: flex;
	flex-direction: column;
}

.botoes {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.botoes Button {
	margin-top: 5px;
	align-items: center;
}
</style>
