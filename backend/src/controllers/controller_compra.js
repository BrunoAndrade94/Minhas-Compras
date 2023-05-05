module.exports = (app) => {
	const { db_inserir, db_obter, db_obter_id, db_total_compra } =
		app.src.models.model_compra;

	const { valor_total_produto } = app.src.services.service_compra;

	//
	// INCLUIR AS VALIDACOES DOS DADOS
	//

	const inserir = (req, res) => {
		try {
			const compra = { ...req.body };

			valor_total_produto(compra);

			db_inserir(compra);

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

			// teste o id
			// testando...

			const compra = await db_obter_id(id_compra);

			compra.map((e) => {
				let res = (e.quantidade += e.quantidade);
				console.log(res);
			});

			res.json(compra);
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const total_compra = async (req, res) => {
		const id_compra = req.params.id_compra;
		const total_compra = await valor_total_produto(id_compra);
		res.json(total_compra);
	};

	return {
		inserir,
		obter,
		obter_id,
		total_compra,
	};
};
