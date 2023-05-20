/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.integer("id_compra");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.dropColumn("id_compra");
	});
};
