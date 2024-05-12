/* CRIANDO CLASSE DE ERRO*/

class AppError {
  message; /* são variáveis*/
  statusCode;

  constructor(message, statusCode = 400){ /* coloquei a mensagem 400 como padrão*/
    this.message = message; /*passando  a message laranja(linha 7) para o contexto da message global da linha 4*/
    this.statusCode = statusCode;
  }
}

module.exports = AppError;