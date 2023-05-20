/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("compras_realizadas", (coluna) => {
		coluna.increments("id").primary();
		coluna.float("valor_total");
		coluna.integer("quantidade_de_produtos");

		coluna.timestamp("data_da_compra").defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("compras_realizadas");
};
