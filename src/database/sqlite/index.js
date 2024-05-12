const sqlite3 = require("sqlite3"); // é o drive de fato
const sqlite = require("sqlite"); // é o que vou usar para me conectar
const path = require("path"); // é uma biblioteca do node que resolve os endereços de acordo com o ambiente

async function sqliteConnection(){
  const database = await sqlite.open({
    /*filename:"../../database"                 /* não fazer isso. Fazer conforme escrito abaixo*/
    filename: path.resolve(__dirname, "..", "database.db"), /*resolve é para resolve, o sirname pega de forma automárica onde eu estou dentro
    do meu projeto, ".." serve para voltar uma pasta para trás, agora crio um arquivo chamado database.db */
    driver: sqlite3.Database // indico o drive que vou utilizar, que é o sqlite3
  });

  return database;
}

module.exports = sqliteConnection;