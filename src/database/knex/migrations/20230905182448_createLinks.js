
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // significa que se eu deletar a nota a qual a tag estiver vinculada,
  // automaticamente vai deletar os links. Ou seja, deleta os links que estão vinculados à nota, em cascata.

  table.timestamp("created_at").default(knex.fn.now());
}); //up cria a tabela


exports.down = knex => knex.schema.dropTable("links");//down deleta a tabela

