const sqliteConnection = require('../../sqlite');
const createUsers = require("./createUsers");

async function migrationsRun(){
  const schemas = [
    createUsers
  ].join(''); // join serve para remover os espaços

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error)); // caso de algum erro
}

module.exports = migrationsRun;