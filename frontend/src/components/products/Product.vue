<template>
	<div class="product">
		<Page_Title
			icon="pi pi-apple"
			main_title="Produtos"
			sub_title="Acesso a tudo de produtos"
		/>
		<div class="input-produto">
			<label for="nome-produto">Produto Descrição</label>
			<InputText id="nome-produto" v-model="nome_produto" />
		</div>
		<div class="input-valor-produto">
			<label for="valor-produto"> Valor Unitário</label>
			<InputNumber
				v-model="valor_produto"
				inputId="valor-produto"
				mode="currency"
				currency="BRL"
			/>
		</div>
		<div class="botao">
			<Button label="Adicionar" @click="inserir_produto" />
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { base_api_url } from "../../configs/databases/database_url";
import Page_Title from "../templates/Page_Title.vue";

export default {
	name: "Product",
	components: { Page_Title },
	data() {
		return {
			nome_produto: "",
			valor_produto: null,
		};
	},
	methods: {
		inserir_produto() {
			const produto = {
				descricao: this.nome_produto,
				ultimo_valor: this.valor_produto,
			};

			axios.post(`${base_api_url}produtos`, produto).then(() => {
				// this.$toasted.global.sucesso();
			});
		},
	},
};
</script>

<style>
.product {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.input-produto {
	display: flex;
	margin: 15px;
	flex-direction: column;
	align-items: center;
}

.input-valor-produto {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.botao {
	margin: 15px;
}
</style>
