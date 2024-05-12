/* esta pasta servirá para reunir todas as minhas rotas e grupos de rotas da minha aplicação em um só lugar */

const {Router} = require("express"); // estou importanto o Router do express

const userRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();
routes.use("/users", userRouter); /* toda vez que alguém for acessar o meu /user, vai ser redirecionado para o userRotuer, que é o grupo de rotas do usuário*/
routes.use("/notes", notesRouter); 
routes.use("/tags", tagsRouter); 
routes.use("/sessions", sessionsRoutes); 

module.exports = routes;