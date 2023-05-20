export const dia_mes_ano = new Date().toLocaleDateString("pt-BR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

export const dia = new Date().toLocaleDateString("pt-BR", {
	day: "2-digit",
});

export const mes_ano = new Date().toLocaleDateString("pt-BR", {
	month: "2-digit",
	year: "numeric",
});

export const mes = new Date().toLocaleDateString("pt-BR", {
	month: "2-digit",
});

export const ano = new Date().toLocaleDateString("pt-BR", {
	year: "numeric",
});

export const data_completa = new Date().toLocaleDateString("pt-BR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
});
