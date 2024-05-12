const knex = require("../database/knex");
const AppError = require("../utils/AppError"); // para validar se usuário existe
const {compare} = require("bcryptjs"); // para comparar a senha criptografada. "compare" é uma função dentro do bcryptjs
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");


class SessionsController {
  async create(request, response){ //assíncrona, pois envolve conexão com banco de dados. crio aqui uma sessão para o usuário.
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first(); // na tabela users, quero filtrar o usuário pelo email. first() serve para garantir que devolva somente UM.
    
    if(!user) { // "SE USUÁRIO NÃO EXISTIR"
      throw new AppError("Senha e/ ou e-mail incorreto", 401); // o erro 401 significa não autorizado
    }
    
    const passwordMatched = await compare(password, user.password); // comparo a senha que o usuário acabou de digitar, com a senha cadastrada no banco de dados
    
    if (!passwordMatched) { //"SE SENHA FOR INCORRETA". se for falso, significa que não bateu a senha. Então mostro o erro: 
      throw new AppError("Senha e/ ou e-mail incorreto", 401); // o erro 401 significa não autorizado
    }

    /*se passou por essas duas etapas acima, então o usuário tem as credenciais de acesso.
    Vamos gerar token e entregar esse token para o usuário, para ele depois usá-lo como uma chave para fazer as requisições já autenticadas na aplicação*/

    const {secret, expiresIn} = authConfig.jwt;
    const token = sign({}, secret, { //objeto vazio, chave secreta, subject que é o conteúdo que quero colocar dentro do token
      subject: String(user.id), // uso string para converter para texto
      expiresIn
    })
    
    return response.json({user, token});
  }
}

module.exports = SessionsController;