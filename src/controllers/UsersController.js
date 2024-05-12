const {hash, compare} = require("bcryptjs"); // para a criptografia
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const UserRepository =require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController { 
  async create(request, response) {/* não preciso deixar explícito que é uma função pois a classe já sabe*/
    const {name, email, password} = request.body;  

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({name, email, password});

    return response.status(201).json();
  } 

  async update (request, response) {// FUNCIONALIDADE DE ATUALIAÇÃO DO USUÁRIO
    const {name, email, password, old_password} = request.body; //infos que quero pegar 
    const user_id = request.user.id; //infos que quero pegar. O id dentro do usuário, que está dentro da requisição

    const database = await sqliteConnection(); // isso é para fazer minha conexão com o banco de dados

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]); // faço a busca pelo usuário, seleciono o usuário pelo id
    
    if(!user) { // If para o caso em que o usuário não existe. Pq se tiver somente a linha acima, ele não vai retornar nada para a constante "users". E com esse if, retorna a mensagem de erro a seguir.
      throw new AppError("Usuário não encontrado."); // lanço essa exceção com o AppError
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]); // verificar se a pessoa está tentando mudar o email para outro que já exista.
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){ // se encontrar um email e se esse o id desse email for diferente do id do usuário, vai lançar a mensagem a seguir, pois significa que o email já está em uso de outro usuário.
      throw new AppError ("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name; // atualizo com o novo nome que o usuário informou /
    user.email = email ?? user.email; // atualizo com o novo email que o usuário informou /

    if(password && !old_password){ // se a pessoa não informar a senha antiga quando quiser atualizar a senha
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha.");
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password); // uso await pq é assíncrono. Compar oa senha antiga salva no meu banco de dados com a senha antiga que o usuário acabou de me informar

      if(!checkOldPassword){
        throw new AppError("A senha antiga não confere.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    ); /* UPDATE users SET  significa: atualize na tabela de usuário e defina os seguintes valroes*/
    //uptated_at vai atualizar através de uma função do banco de dados, chamada DATETIME e vai receber o valor 'now', ou seja a data e hora atuais. Por isso não preciso mencionar ele dentro do Arrow, pois ele estará sendo gerado ali fora já

    return response.json();

  }
}

module.exports = UsersController;





