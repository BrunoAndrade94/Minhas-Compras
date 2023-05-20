<template>
	<div class="product">
		<Page_Title
			icon="pi pi-plus"
			main_title="Incluir Produto"
			sub_title="Cadastre um novo Produto!"
		/>

		<div class="input-produto">
			<span style="margin-top: 5px" class="p-float-label">
				<InputText id="nome-produto" v-model="descricao" />
				<label for="nome-produto">Produto Descrição</label>
			</span>

			<span style="margin-top: 29px" class="p-float-label">
				<InputNumber
					v-model="valor_produto"
					inputId="valor-produto"
					mode="currency"
					currency="BRL"
				/>
				<label for="valor-produto"> Valor Unitário</label>
			</span>

			<span style="margin-top: 29px" class="p-float-label">
				<InputNumber id="number-input" v-model="codigo_de_barras" />
				<label for="number-input">Código de Barras</label>
			</span>
		</div>
		<Toast />
		<div class="botao">
			<Button label="Adicionar" @click="botao_inserir_produto" />
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
			descricao: "",
			valor_produto: null,
			codigo_de_barras: null,
		};
	},
	methods: {
		botao_inserir_produto() {
			const produto = {
				descricao: this.descricao,
				ultimo_valor: this.valor_produto,
				codigo_de_barras: this.codigo_de_barras,
			};

			axios
				.post(`${base_api_url}produtos`, produto)
				.then(() => {
					this.$toast.add({
						severity: "success",
						summary: produto.descricao,
						detail: "Inserido com Sucesso!",
						life: 3000,
					});
				})
				.catch((erro) => {
					this.$toast.add({
						severity: "error",
						summary: "Erro",
						detail: "Produto não inserido!",
						life: 3000,
					});
				})
				.finally(this.limpar_data());
		},
		limpar_data() {
			this.descricao = "";
			this.valor_produto = null;
			this.codigo_de_barras = null;
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
	margin: 5px;
}
</style>
