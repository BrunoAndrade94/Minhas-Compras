/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("compras", (coluna) => {
		coluna.dropColumn("valor_total_compra");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable("compras", (coluna) => {
		coluna.float("valor_total_compra");
	});
};
