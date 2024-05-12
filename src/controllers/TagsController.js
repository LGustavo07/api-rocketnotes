const knex = require("../database/knex");

class TagsController{
  async index(request, response){ //responsável por listar todas as tags cadastradas do usuário
    //const {user_id} = request.params;// recuperando o user_id do meu parâmetro. obs as chaves servem para desestruturar o objeto
    const user_id = request.user.id;
    
    const tags = await knex("tags") //buscando pelas tags, propriamente ditas
      .where({user_id}) // mesma coisa que .where({user_id: user_id}) já que os nomes são iguais, apesar de referentes a coisas em lugares diferentes, pois um é o nome do campo na tabela e outro é a variável daqui
      .groupBy("name")  // groupBy serve para agrupar pelos "nomes" e remover os "nomes" duplicados
    
      return response.json(tags);
  } 
}

module.exports = TagsController;