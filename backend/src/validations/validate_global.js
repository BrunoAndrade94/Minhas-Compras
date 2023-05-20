// MODULO COM FUNCOES DE VALIDACOES GLOBAIS

module.exports = () => {
	const isso_existe = (valor, msg) => {
		if (!valor) throw msg;
		if (Array.isArray(valor) && valor.length === 0) throw msg;
		if (typeof valor === "string" && !valor.trim()) throw msg;
	};

	const validar_numero = (numero) => {
		if (!Number(numero)) throw "Número Inválido!";
	};

	return {
		isso_existe,
		validar_numero,
	};
};
