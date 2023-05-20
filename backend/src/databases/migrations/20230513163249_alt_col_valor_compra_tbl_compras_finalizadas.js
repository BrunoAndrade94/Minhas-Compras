/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.renameColumn("valor_total_da_compra", "valor_total");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.renameColumn("valor_total", "valor_total_da_compra");
	});
};
