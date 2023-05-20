<template>
	<div class="home">
		<Page_Title
			icon="pi pi-home"
			main_title="Início"
			sub_title="Algumas info do sistema!"
		></Page_Title>
		<div
			style="
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: start;
			"
			class="card"
		>
			<Fieldset style="margin-top: 10px" toggleable legend="Produtos">
				Cadastrados {{ produtos_db.length }}
				<hr />
				O mais comprado
				{{ total_de_produto_repetidos }}
			</Fieldset>
			<Fieldset style="margin-top: 10px" toggleable legend="Compras">
				<span
					style="
						display: flex;
						flex-direction: column;
						align-items: center;
						color: burlywood;
					"
				>
					{{ data_atual }}
				</span>
				<br />
				Fizemos {{ compras_total_mes }} compras neste mês
				<br />
				Gastamos R$ {{ compras_atual.gasto_mensal }}

				neste mês
				<hr />
				Fizemos
				{{ compras_total_ano }} compras neste ano
				<br />
				Gastamos R$ {{ compras_atual.gasto_anual }}

				neste ano
			</Fieldset>
			<Fieldset style="margin-top: 10px" toggleable legend="ELA e UNO">
				EU AMO A ELA <i class="pi pi-heart"></i>
			</Fieldset>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mes_ano } from "../../configs/styles/data_formato";
import { base_api_url } from "../../configs/databases/database_url";
import Page_Title from "../templates/Page_Title.vue";

export default {
	name: "Home",
	components: { Page_Title },
	data() {
		return {
			produtos_db: [],
			compras_atual: [],
			compras_total_ano: 0,
			compras_total_mes: 0,
			lista_de_compras: [],
			compras_realizadas_db: [],
			data_ano_atual: new Date().getFullYear(),
			data_mes_atual: new Date().getMonth() + 1,
			data_atual: mes_ano,
			o_mais_comprado: [],
			total_de_produto_repetidos: [],
		};
	},
	watch: {
		compras_realizadas_db() {
			this.fn_calcular_gastos();
		},
		produtos_db() {
			this.fn_obter_produto_mais_comprado();
		},
	},
	methods: {
		fn_obter_produto_mais_comprado() {
			this.total_de_produto_repetidos = this.lista_de_compras.reduce(
				(acc, item) => {
					acc[item.id_produto] = (acc[item.id_produto] || 0) + 1;
					return acc;
				},
				{}
			);

			console.log(this.total_de_produto_repetidos);
		},

		fn_calcular_gastos() {
			// FUNÇÕES INTERNAS
			const fni_calcular_gastos_ano = () => {
				this.compras_atual.anual = this.compras_realizadas_db.filter(
					(compras) => {
						return (
							new Date(compras.data_da_compra).getFullYear() ===
							this.data_ano_atual
						);
					},
					{}
				);
				this.compras_total_ano = this.compras_atual.anual.length;

				this.compras_atual.gasto_anual = this.compras_atual.anual
					.reduce(
						(acc, compra) => (acc += compra.valor_total_compra),
						0
					)
					.toLocaleString();
			};
			const fni_calcular_gastos_mes = () => {
				this.compras_atual.mensal = this.compras_atual.anual.filter(
					(compras) =>
						new Date(compras.data_da_compra).getMonth() + 1 ===
						this.data_mes_atual
				);
				this.compras_total_mes = this.compras_atual.mensal.length;

				this.compras_atual.gasto_mensal = this.compras_atual.mensal
					.reduce(
						(acc, compra) => (acc += compra.valor_total_compra),
						0
					)
					.toLocaleString("BR");
			};
			//

			// CHAMANDO FUNCÕES INTERNAS
			fni_calcular_gastos_ano();
			fni_calcular_gastos_mes();
			//
		},
		fn_obter_produtos_db() {
			axios
				.get(`${base_api_url}produtos`)
				.then((res) => (this.produtos_db = res.data));
		},
		fn_obter_compras_realizadas_db() {
			axios
				.get(`${base_api_url}compras-realizadas`)
				.then((res) => (this.compras_realizadas_db = res.data));
		},
		fn_obter_lista_de_compras_db() {
			axios
				.get(`${base_api_url}compras`)
				.then((res) => (this.lista_de_compras = res.data));
		},
		fn_carregar_dados() {
			this.fn_obter_produtos_db();
			this.fn_obter_compras_realizadas_db();
			this.fn_obter_lista_de_compras_db();
		},
	},
	mounted() {
		this.fn_carregar_dados();
	},
};
</script>

<style></style>
