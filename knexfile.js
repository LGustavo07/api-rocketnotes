const path =require("path");

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") // faz conexão com banco de dados
    },

    pool: { // essa função pool vai ser executado no momento de conexão com o banco de dados, por isso ela vem logo em seguida ao comando das linhas 7 e 8
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
      /*logo após criar, quero executar uma função em que quero recuperar a conexão conn e a função de callback cb.
      vou pegar a conexão conn e rodar .run um comando "PRAGMA ... " que é pra habilitar a funcionalidade de deletar em cascata.*/
    },
    
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
