const express = require("express");
const app = express();
const consign = require("consign");
const database = require("./configs/databases/database_knex.js");

app.db = database;

consign()
	.then("./src/middlewares/")
	.then("./src/databases/tables/")
	.then("./src/validations/validate_global.js")
	.then("./src/validations/")
	.then("./src/models/")
	.then("./src/services/")
	.then("./src/controllers/")
	.then("./src/configs/")
	.then("./src/routers/")
	.then("./src/servers/")
	.into(app);
