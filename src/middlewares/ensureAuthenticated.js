const {verify} = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig =  require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization; //o token (autorização) do usuário vai estar dentro do header, dentro da request

  if(!authHeader){// "verificando se o authHeader existe". Se não tiver nenhuma info ali dentro, então jogo a exceção dizendo a mensagem de erro
    throw new AppError("JWT Token não informado", 401); // o usuário não tem o jwt nesse caso
  }

  const [, token]  = authHeader.split(" "); // split pega a string e separa ela passando-a para um vetor. Bare xxxtokenxxx

  try{
    const {sub: user_id} = verify(token, authConfig.jwt.secret); // rever aula "st10 middleware de autenticação" minuto 06:08
    
    request.user ={
      id: Number(user_id), // number tranforma novamente para número o que antes lá em SessionController tinha sido transformado em string
    };

    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401); // o usuário tem um jwt, porém inválido

  }
}

module.exports = ensureAuthenticated;