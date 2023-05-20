module.exports = (app) => {
	const {
		db_obter,
		db_inserir,
		db_obter_id,
		db_remover_compra,
		db_finalizar_compra,
		db_obter_ultima_compra,
		db_obter_compras_finalizadas,
		db_obter_id_com_nome_do_produto,
	} = app.src.models.model_compra;

	const { validar_numero } = app.src.validations.validate_global;

	const { valor_total_produto } = app.src.services.service_compra;

	const total_compra = async (req, res) => {
		const id_compra = req.params.id_compra;
		const total_compra = await valor_total_produto(id_compra);
		res.json(total_compra);
	};

	const inserir = (req, res) => {
		try {
			const compra = { ...req.body };

			// valor_total_produto(compra);
			db_inserir(compra);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover_compra = (req, res) => {
		try {
			const id = req.params.id;
			validar_numero(id);

			db_remover_compra(id);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = async (req, res) => {
		const compras = await db_obter();
		res.json(compras);
	};

	const obter_id = async (req, res) => {
		try {
			const id_compra = req.params.id;

			validar_numero(id_compra);
			const compra = await db_obter_id(id_compra);

			res.json(compra);
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter_id_com_nome_do_produto = async (req, res) => {
		try {
			const id_compra = req.params.id;

			validar_numero(id_compra);
			const compra = await db_obter_id_com_nome_do_produto(id_compra);

			res.json(compra);
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter_ultima_compra = async (req, res) => {
		const compra = await db_obter_ultima_compra();
		// ja envia o id da proxima compra (não da atual)
		// compra.id_compra++;
		res.json(compra);
	};

	const finalizar_compra = (req, res) => {
		try {
			const compra = { ...req.body };
			db_finalizar_compra(compra);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter_compras_finalizadas = async (req, res) => {
		const compras = await db_obter_compras_finalizadas();
		res.json(compras);
	};

	return {
		inserir,
		obter,
		obter_id,
		total_compra,
		obter_ultima_compra,
		finalizar_compra,
		obter_compras_finalizadas,
		obter_id_com_nome_do_produto,
		remover_compra,
	};
};
