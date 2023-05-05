// UNICO MODULO QUE ACESSA O BANCO DE DADOS

module.exports = (app) => {
	const db_obter = async (tabela) => {
		return await app.db(tabela).select().whereNull("deletado_em").then();
	};

	const db_inserir = (data, tabela) => {
		app.db(tabela).insert(data).then();
	};

	const db_obter_por_id = async (id, tabela) => {
		return await app
			.db(tabela)
			.select()
			.where({ id: id })
			// .whereNull({ deletado_em })
			// .first()
			.then();
	};

	const db_deletar = (id, tabela) => {
		app.db(tabela)
			.update({ deletado_em: new Date() })
			.where({ id: id })
			.then();
	};

	const db_atualizar = (data, tabela) => {
		data.atualizado_em = new Date();
		app.db(tabela).update(data).where({ id: data.id }).then();
	};

	return {
		db_obter,
		db_inserir,
		db_deletar,
		db_obter_por_id,
		db_atualizar,
	};
};
