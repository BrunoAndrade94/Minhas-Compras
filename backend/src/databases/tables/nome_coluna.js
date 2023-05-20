module.exports = () => {
	const coluna_de_produtos = [
		"id_produto",
		"descricao",
		"ultimo_valor",
		"codigo_de_barras",
		"data_ultimo_valor",
	];

	const coluna_removido_em = "removido_em";

	return {
		coluna_de_produtos,
		coluna_removido_em,
	};
};
