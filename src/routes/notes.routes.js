const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController(); //a constante notesController é uma instância do NotesController

notesRoutes.use(ensureAuthenticated); // aplico essa autenticação para todas as rotas a seguir

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show); /* essa linha faz com que a rota seja visível*/
notesRoutes.delete("/:id", notesController.delete); /* essa linha faz com que a rota de deletar seja visível*/
notesRoutes.get("/", notesController.index);

/* para eu expor as rotas. exporto para quem quiser usar o arquivo, poder usar*/
module.exports = notesRoutes;
