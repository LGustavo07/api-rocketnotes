//Este arquivo contém a lógica do banco de dados para busca pelo e-mail e criação do usuário
const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email){
    const database = await sqliteConnection();  // coloco o async acima, para o await daqui ficar disponível para mim
    const user = await database.get("SELECT * FROM users WHERE email =(?)", [email]); //vai checar pelo email se o usuário existe// get pq quero buscar informações. // A niterrogação será substituída pela variável que estiver em [email]

    return user;
  }

  async create({name, email, password}){
    const database = await sqliteConnection();  // coloco o async acima, para o await daqui ficar disponível para mim
    const userId = await database.run("INSERT INTO users (name, email,password) VALUES (?, ?, ?)",
    [name, email, password]
    );

    return {id: userId};
  }
}

module.exports = UserRepository;

