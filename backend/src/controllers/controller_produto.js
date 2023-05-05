module.exports = (app) => {
	const inserir = (req, res) => {
		const produto = { ...req.body };

		app.db("produtos").insert(produto).then();
		res.status(204).send();
	};

	const obter = async (req, res) => {
		const prod = await app.db("produtos").select().then();

		res.json(prod);
	};

	return {
		inserir,
		obter,
	};
};
