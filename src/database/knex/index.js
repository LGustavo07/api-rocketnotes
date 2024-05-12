const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config.development); // aqui crio a minha conexão entre o knex e o banco de dados!

module.exports = connection; // exportando a minha conexão 