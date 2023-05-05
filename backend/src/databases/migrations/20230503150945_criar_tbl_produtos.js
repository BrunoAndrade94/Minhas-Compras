/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("produtos", (coluna) => {
		coluna.increments("id_produto").primary();
		coluna.string("descricao").notNull();
		coluna.float("ultimo_valor").notNull();
		coluna.integer("codigo_de_barras");

		coluna.timestamp("data_ultimo_valor").defaultTo(knex.fn.now());
		coluna.timestamp("criado_em").defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("produtos");
};
