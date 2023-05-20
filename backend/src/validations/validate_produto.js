module.exports = (app) => {
	const { isso_existe } = app.src.validations.validate_global;

	const validar_produto = (produto) => {
		isso_existe(produto.descricao, "Descrição não informada!");
		isso_existe(produto.ultimo_valor, "Último valor não informado!");

		// isso_existe(
		// 	produto.codigo_de_barras,
		// 	"Código de barras não informado!"
		// );
	};

	return {
		validar_produto,
	};
};
