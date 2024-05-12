const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage {
  //FUNÇÃO PARA MUDAR ARQUIVO(IMAGEM) DE LUGAR, SALVANDO O ARQUIVO
  async saveFile(file) {
    await fs.promises.rename( // o rename vai ser para mudar o arquivo de lugar, colocando-o da pasta temporária para a de upload. 
                              //RENAME serve para renomear ou mover o arquivo. 
                              //Preciso colocar um promises já que mudar arquivo de lugar pode levar um tempo. 
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) //path.resolve resolve numa sequência de segmentos de caminho para um determinado caminho absoluto. Resolve o caminho de acordo com o sistema operacional, caminho correto de encontrar o arquivo para pegarmos o endereço correto onde ele está
    );

    return file;
  }

  //FUNÇÃO PARA DELETAR O ARQUIVO(IMAGEM)
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    //try e catch para tratamento de exceções, necessário para a manipulaçã ode arquivos desse tipo na aplicação
    try { 
      await fs.promises.stat(filePath); //fs.promises.stat é para verificar o estado do filePath. Stat retorna o estado(status) do arquivo, por exemplo se ele está corrompido, ou disponível, etc
    } catch { // caso algo de errado
      return;
    }

    await fs.promises.unlink(filePath); // unlink é uma função dentro do fs que remove o arquivo no endereço filePath
  }
}

module.exports = DiskStorage;