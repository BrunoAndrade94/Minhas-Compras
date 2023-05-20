module.exports = (app) => {
	const {
		db_inserir_produto,
		db_obter_produtos,
		db_obter_produto_com_id,
		db_remover_produto,
	} = app.src.models.model_produto;
	const { validar_produto } = app.src.validations.validate_produto;
	const { validar_numero } = app.src.validations.validate_global;

	// ok
	const inserir = (req, res) => {
		try {
			const produto = { ...req.body };

			validar_produto(produto);
			db_inserir_produto(produto);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover_produto = (req, res) => {
		try {
			const id = req.params.id;
			validar_numero(id);

			db_remover_produto(id);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	// ok
	const obter_produto = async (req, res) => {
		const produtos = await db_obter_produtos();

		res.json(produtos);
	};

	// ok
	const obter_produto_com_id = async (req, res) => {
		try {
			const id = req.params.id;
			validar_numero(id);

			const produto = await db_obter_produto_com_id(id);
			res.json(produto);
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return {
		inserir,
		obter_produto,
		obter_produto_com_id,
		remover_produto,
	};
};
