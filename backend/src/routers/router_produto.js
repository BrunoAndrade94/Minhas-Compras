module.exports = (app) => {
	app.route("/produtos")
		.get(app.src.controllers.controller_produto.obter)
		.post(app.src.controllers.controller_produto.inserir);
};
