module.exports = () => {
	const valor_total_produto = (compra) => {
		const total = compra.valor_unitario_produto * compra.quantidade;
		compra.valor_total_produto = total.toFixed(2);
	};

	return { valor_total_produto };
};
