module.exports = (app) => {
	app.route("/produtos")
		.get(app.src.controllers.controller_produto.obter_produto)
		.post(app.src.controllers.controller_produto.inserir);

	app.route("/produtos/:id")
		.get(app.src.controllers.controller_produto.obter_produto_com_id)
		.delete(app.src.controllers.controller_produto.remover_produto);
};
