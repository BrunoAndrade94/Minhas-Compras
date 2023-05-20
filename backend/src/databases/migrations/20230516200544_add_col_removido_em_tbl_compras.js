/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.timestamp("removido_em");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable("compras_realizadas", (coluna) => {
		coluna.dropColumn("removido_em");
	});
};
