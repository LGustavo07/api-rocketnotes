require("express-async-errors");
require ("dotenv/config");
const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");
const express = require("express");

const routes = require("./routes") /* quando não especifico a rota, ele puxa automaticamente o index, ou seja, é a mesma coisa que require("./routes/index.js")*/

const uploadConfig = require("./configs/upload");

const cors = require("cors");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json()); // diz qual o formato que quero que mostre o resultado da minha requisção

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)); //static é para servir aquivos estáticos. No caso, essa linha refere-se à imagem do avatar

app.use(routes); /* AS ROTAS ESTÃO AQUI!*/


app.use((error, request, response, next) => { /* verificando se é erro do cliente*/
  if (error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({ /* verificando se é erro do servidor*/
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3333; // endereço 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // fique escutando na porta PORT e quando ela iniciar, vai soltar uma msg dizendo qual é essa porta


