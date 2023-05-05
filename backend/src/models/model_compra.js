module.exports = (app) => {
	const _tabela = "compras";

	const db_inserir = (compra) => {
		app.db(_tabela).insert(compra).then();
	};

	const db_obter = async () => {
		return await app.db(_tabela).select().then();
	};

	const db_obter_id = async (id_compra) => {
		return await app.db(_tabela).select().where({ id_compra }).then();
	};

	const db_total_compra = async (id_compra) => {
		// id compra
		// total de items
		// valor total compra
		const lista_compra = await app
			.db(_tabela)
			.select("id_compra", "id_produto", "valor_unitario_produto")
			.where({ id_compra: id_compra })
			.then();
		return lista_compra;
	};

	return {
		db_inserir,
		db_obter,
		db_obter_id,
		db_total_compra,
	};
};
