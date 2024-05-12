
exports.up = knex => knex.schema.createTable("tags", table => { /* tags facilitam o uso de filtros*/
  table.increments("id");
  table.text("name").notNullable(); //text é o tipo texto / notNullable significa que não é para aceitar valores nulos
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // significa que se eu deletar a nota a qual a tag estiver vinculada,
  // automaticamente vai deletar a tag. Ou seja, deleta as tags que estão vinculadas à nota, em cascata.
  
  table.integer("user_id").references("id").inTable("users"); // aqui estou criando um campo do tipo inteiro na minha tabela, 
  //chamado "user_id" e ele faz uma referência ao "id" que existe dentro da tabela "users". 
  //Logo só posso criar uma nota se eu tiver um usuário para vinculá-la.


}); //up cria a tabela


exports.down = knex => knex.schema.dropTable("tags");//down deleta a tabela

