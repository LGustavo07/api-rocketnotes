//ARQUIVO DE CONFIGURAÇÕES DO UPLOAD QUE UTILIZAREMOS NA APLICAÇÃO

const path = require("path");
const multer = require("multer");
const crypto = require("crypto"); // usarei crypto para criar um hash

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // endereço (temporário) onde a imagem chega
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // endereço onde a imagem ficará de fato

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // o DESTINO para onde o arquivo vai
    filename(request, file, callback){ // o NOME do arquivo. Uma função que 
      const fileHash = crypto.randomBytes(10).toString("hex"); // hash para evitar que eu tenha arquivos com nomes iguais. Se esse for o caso, vai sobrepor o arquivo. // .toString("hex") para o formato ser hexadecimal
      const fileName = `${fileHash}-${file.originalname}`; // evitar que tenha nomes iguais

      return callback(null, fileName);
    } ,
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}