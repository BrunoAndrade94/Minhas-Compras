<template>
	<div class="comprar">
		<Page_Title
			icon="pi pi-cart-plus"
			main_title="Comprar"
			sub_title="Realize aqui sua compra!"
		/>
		<InputNumber
			id="id_compra"
			prefix="Compra de ID "
			v-model="compra.id_compra"
			disabled
		/>
		<Listbox
			:options="compra.produto"
			filter
			optionLabel="descricao"
			listStyle="max-height:199px"
		/>
		<label for="valor"> Valor Unitario do Produto</label>
		<InputNumber
			v-model="compra.valor_produto"
			inputId="valor"
			mode="currency"
			currency="BRL"
			locale="pt-BR"
			@click="zerar_valor_produto"
		/>
		<label for="quantidadeProduto">Quantidade</label>
		<InputNumber
			id="quantidadeProduto"
			showButtons
			mode="decimal"
			v-model="compra.quantidade_produto"
			:min="quantidade_minima"
		/>
		<label for="valor"> Valor Total do Produto</label>
		<InputNumber
			v-model="compra.valor_produto"
			inputId="valor"
			mode="currency"
			currency="BRL"
			locale="pt-BR"
			@click="zerar_valor_produto"
		/>
		<label for="valor"> Valor Total</label>
		<InputNumber
			id="total_compra"
			prefix="Total "
			mode="currency"
			currency="BRL"
			locale="pt-BR"
			v-model="compra.total_compra"
			disabled
		/>
		<div>
			<Button label="Comprar" icon="pi pi-check" />
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { base_api_url } from "../configs/databases/database_url";
import Page_Title from "./templates/Page_Title.vue";

export default {
	name: "Comprar",
	components: { Page_Title },
	data() {
		return {
			pro_sel: null,
			compra: {
				id_compra: 1,
				produto: null,
				valor_produto: 5,
				quantidade_produto: 5,
				total_compra: 5 * 5,
			},

			quantidade_minima: 0,
		};
	},
	methods: {
		zerar_valor_produto() {
			if (this.valor_produto === 0) {
				this.valor_produto = null;
			}
		},
		obter_produtos() {
			axios.get(`${base_api_url}produtos`).then((res) => {
				this.compra.produto = res.data;
				this.compra.valor_produto = res.data.ultimo_valor;
			});
		},
	},
	mounted() {
		this.obter_produtos();
	},
};
</script>

<style>
.comprar {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
