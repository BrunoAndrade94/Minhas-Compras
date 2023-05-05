require("dotenv").config();

module.exports = {
	client: process.env.DATABASE_CLIENT,
	connection: {
		port: process.env.DATABASE_PORT,
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_DB,
	},
	pool: {
		min: 0,
		max: 7,
	},

	migrations: {
		tableName: "migrations",
		directory: "./src/databases/migrations",
	},
};
