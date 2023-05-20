module.exports = (app) => {
	const {
		tabela_de_compras,
		tabela_de_produtos,
		tabela_de_compras_realizadas,
	} = app.src.databases.tables.nome_tabela;

	// colocar no service de produtos
	const atualizar_valor_produto = async (compra) => {
		const produto = {
			ultimo_valor: compra.valor_unitario_produto,
			data_ultimo_valor: new Date(),
		};
		await app
			.db(tabela_de_produtos)
			.update(produto)
			.where({ id_produto: compra.id_produto })
			.then();
	};

	const db_inserir = async (compra) => {
		// a função atualiza valor do produto
		// com base no valor da ultima compra feita
		//
		await atualizar_valor_produto(compra);

		//
		// await calcular_valor_total(compra);
		//
		app.db(tabela_de_compras).insert(compra).then();
	};

	const db_obter = async () => {
		return await app.db(tabela_de_compras).then();
	};

	const db_obter_ultima_compra = async () => {
		return await app
			.db(tabela_de_compras)
			.orderBy("id_compra", "desc")
			.first()
			.then();
	};

	const db_obter_id = async (id_compra) => {
		return await app.db(tabela_de_compras).where({ id_compra }).then();
	};

	const db_obter_id_com_nome_do_produto = async (id_compra) => {
		return await app
			.db("produtos")
			.join("compras", "produtos.id_produto", "=", "compras.id_produto")
			.select(
				"produtos.descricao",
				"compras.quantidade_produto",
				"compras.valor_unitario_produto",
				"compras.valor_total_produto"
			)
			.where({ "compras.id_compra": id_compra })
			.then();
	};

	const db_total_compra = async (id_compra) => {
		return await app
			.db(tabela_de_compras)
			.select("id_compra", "id_produto", "valor_unitario_produto")
			.where({ id_compra })
			.then();
	};

	//
	// CONSULTAS NA TABELA DE COMPRAS FINALIZADAS

	const db_finalizar_compra = (compra) => {
		// teste de inclusao manual de data
		// compra.data_da_compra = new Date("2023-08-06");
		app.db(tabela_de_compras_realizadas).insert(compra).then();
	};

	const db_obter_compras_finalizadas = async () => {
		return await app
			.db(tabela_de_compras_realizadas)
			.orderBy("id_compra", "desc")
			.whereNull("removido_em")
			.whereNotNull("valor_total_compra")
			// .first()
			.then();
	};

	const db_remover_compra = (id_compra) => {
		app.db(tabela_de_compras_realizadas)
			.update({ removido_em: new Date() })
			.where({ id_compra })
			.then();
	};

	return {
		db_obter,
		db_inserir,
		db_obter_id,
		db_total_compra,
		db_finalizar_compra,
		db_obter_ultima_compra,
		db_obter_compras_finalizadas,
		db_obter_id_com_nome_do_produto,
		db_remover_compra,
	};
};
