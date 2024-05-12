const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsController = new TagsController(); 

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

/* para eu expor as rotas. exporto para quem quiser usar o arquivo, poder usar*/
module.exports = tagsRoutes;
