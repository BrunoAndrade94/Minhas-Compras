module.exports = (app) => {
	const { isso_existe } = app.src.validations.validate_global;

	const validar_compra = (compra) => {};

	return {
		validar_compra,
	};
};
