const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  
  async update(request,response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename; // nome do arquivo que o usuário fez o upload

    const diskStorage = new DiskStorage();

    const user = await knex("users")
      .where({id: user_id}).first(); // faça busca por usuários onde o id do usuário seja igual o user_id.

      if(!user){ //verificar se o usuário não existe
        throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
      }

      if(user.avatar){
        await diskStorage.deleteFile(user.avatar); // deletando a foto antiga, se ela existir
      }

      const filename = await diskStorage.saveFile(avatarFilename); // pegando a nova foto e salvando o novo avatar
      user.avatar = filename;// colocando a nova imagem dentro do avatar

      await knex("users").update(user).where({id:  user_id}); // {id:  user_id} significa que estará atualizando os dados de um usuário específico, e não todos os usuários do banco de dados
      return response.json(user); // retornando o usuário com a imagem atualizada
    
  }
}

module.exports = UserAvatarController;