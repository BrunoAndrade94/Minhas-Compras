module.exports = (app) => {
	app.route("/compras")
		.get(app.src.controllers.controller_compra.obter)
		.post(app.src.controllers.controller_compra.inserir);

	app.route("/ultima").get(
		app.src.controllers.controller_compra.obter_ultima_compra
	);

	app.route("/compras-realizadas")
		.post(app.src.controllers.controller_compra.finalizar_compra)

		.get(app.src.controllers.controller_compra.obter_compras_finalizadas);

	app.route("/compras/:id")
		.get(app.src.controllers.controller_compra.obter_id)
		.delete(app.src.controllers.controller_compra.remover_compra);

	app.route("/compra-e-produtos/:id").get(
		app.src.controllers.controller_compra.obter_id_com_nome_do_produto
	);
};
