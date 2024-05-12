const { Router } = require("express");

const SessionsController = require("../controllers/SessionsController");
const sessionsController = new SessionsController(); // como é uma classe, instancio ele utilizando o new. Então aloco a classe na memória e armazenando na constante chamada sessionsController

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;