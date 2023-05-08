module.exports = (app) => {
	const porta = process.env.LOCAL_PORT || 4056;
	const host = process.env.LOCAL_HOST || "localhost";

	app.listen(porta, "10.10.0.134", () => {
		console.log(`backend escutando na porta ${porta} em ${host}`);
	});
};
