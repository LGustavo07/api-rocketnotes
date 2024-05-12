
exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title"); //text é para indicar que o title é do tipo texto
  table.text("description");
  table.integer("user_id").references("id").inTable("users"); // aqui estou criando um campo do tipo inteiro na minha tabela, 
  //chamado "user_id" e ele faz uma referência ao "id" que existe dentro da tabela "users". 
  //Logo só posso criar uma nota se eu tiver um usuário para vinculá-la.


  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated").default(knex.fn.now());
}); //up cria a tabela


exports.down = knex => knex.schema.dropTable("notes");//down deleta a tabela
