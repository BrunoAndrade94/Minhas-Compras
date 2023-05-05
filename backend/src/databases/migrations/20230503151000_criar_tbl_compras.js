/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("compras", (coluna) => {
		coluna.integer("id_compra");
		coluna.integer("id_produto");
		// está dando erro, analizar a 1 pra m
		// .references("id_produto")
		// .inTable("produtos");

		coluna.integer("quantidade").defaultTo(1);
		coluna.float("valor_unitario_produto");
		coluna.float("valor_total_produto");
		coluna.float("valor_total_compra");

		coluna.timestamp("comprado_em").defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("compras");
};
