module.exports = (app) => {
	app.route("/compras")
		.get(app.src.controllers.controller_compra.obter)
		.post(app.src.controllers.controller_compra.inserir);

	app.route("/compras/:id").get(
		app.src.controllers.controller_compra.obter_id
	);

	app.route("/compras/:id/total").get(
		app.src.controllers.controller_compra.total_compra
	);
};
