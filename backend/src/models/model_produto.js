module.exports = (app) => {
	const { tabela_de_produtos, tabela_de_compras } =
		app.src.databases.tables.nome_tabela;
	const { coluna_removido_em } = app.src.databases.tables.nome_coluna;

	colunas = [
		"id_produto",
		"descricao",
		"ultimo_valor",
		"codigo_de_barras",
		"criado_em",
		"data_ultimo_valor",
	];

	const db_inserir_produto = (produto) => {
		app.db(tabela_de_produtos).insert(produto).then();
	};

	const db_remover_produto = (id_produto) => {
		app.db(tabela_de_produtos)
			.update({ removido_em: new Date() })
			.where({ id_produto })
			.then();
	};

	const db_obter_produtos = async () => {
		return await app
			.db(tabela_de_produtos)
			.select(colunas)
			.whereNull("removido_em")
			.orderBy("descricao")
			.then();
	};

	const db_obter_produto_com_id = async (id_produto) => {
		return await app
			.db(tabela_de_produtos)
			.select(colunas)
			.where({ id_produto })
			.whereNull(coluna_removido_em)
			.then();
	};

	const db_obter_os_produtos_mais_comprados = async () => {
		return await app
			.db("produtos")
			.join("compras", "produtos.id_produto", "=", "compras.id_produto")
			.select("produtos.descricao");
	};

	return {
		db_inserir_produto,
		db_obter_produtos,
		db_obter_produto_com_id,
		db_remover_produto,
		db_obter_os_produtos_mais_comprados,
	};
};
