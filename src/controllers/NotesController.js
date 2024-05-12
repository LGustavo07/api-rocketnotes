const knex = require("../database/knex"); // importando o knex, acessando o index

class NotesController{
 async create(request, response){ // async create recebe uma requisição e uma resposta
  const { title, description, tags, links } = request.body; // estou desestruturando essas coisas dentro dos {} e pegando a requisição do Body LÁ DO INSOMNIA.
  //const {user_id} = request.params; /* PEGO O ID DO USUÁRIO QUE ESTÁ APARECENDO NO LINK */
  const user_id = request.user.id;

  //CADASTRANDO NOTAS
  const [note_id] = await knex("notes").insert({ // na tabela notes, insiro o título, descrição, id do usuário    
    title, 
    description,
    user_id
  });// colocar colchetes em volta do not_id, para devolver o id dentro de um array na primeira posição


  //PARA inserir  LINKS
  const linksInsert = links.map(link => { // percorro cada item que tenho e para cada link, retorna id das notas e mudo de link para url
    return {
      note_id,
      url: link /*muda de link para URL. Estou criando um novo objeto aqui */
    }
  });

  await knex("links").insert(linksInsert); // insiro na tabela links o linksInsert

  //PARA inserir TAGS
  const tagsInsert = tags.map(name => { // percorro cada tag  que tenho e pego name,  retorna id das notas , nome dela e id do usuário
    return {
      note_id,
      name,
      user_id
    }
  });

  await knex("tags").insert(tagsInsert); // insiro na tabela tags o tagsInsert

  return response.json(); // vou manter um return em todas as respostas para garantir que o código pare quando chegar aqui
 }

 // PARA MOSTRAR/ EXIBIR AS NOTAS
 async show(request, response) {
  const { id } = request.params;

  const note = await knex("notes").where({ id }).first(); /* seleciono a nota utilizando o knex buscando notas baseadas no id 
  (uso o id como parâmetro), e como não quero todas, mas apenas uma, uso o .first() */
  const tags = await knex ("tags").where({note_id: id}).orderBy("name");
  const links = await knex("links").where({note_id: id}).orderBy("created_at");

  return response.json({ /*resposta em forma de objeto */
    ...note, /*despejando todos os detalhes das notas */
    tags,
    links
  });
 }

 // PARA DELETAR 
 async delete (request, response){
  const { id } = request.params;

  await knex("notes").where({id}).delete();

  return response.json();
 }

 //PARA LISTAR AS NOTAS
 async index(request, response) {
  const { title, tags} = request.query;
  const user_id = request.user.id;

  let notes;

  if (tags){
    const filterTags = tags.split(',').map(tag => tag.trim());  // .split serve para transofmrar de texto simples para um vetor, usando a vírgula (',') como separador
    
    notes = await knex("tags")
      .select(["notes.id", "notes.title", "notes.user_id"]) // array com quais campos quero selecionar de cada uma das tabelas , para isso, escrevo nome da tabela, ponto ( . ), nome do campo
      .where("notes.user_id", user_id)//para filtrar baseado no id do usuário. Filtrar as tags que sejam de determinado id do usuário
      .whereLike("notes.title", `%${title}%`) // 
      .whereIn("name", filterTags) //whereIn para analisar com base na tag ( nome da tag)
      .innerJoin("notes", "notes.id", "tags.note_id") // indico a tabela que quero conectar (notes), os campos delas que quero conectar (notes.id da tabela notes e tag.notes_id da tabela tags)
      .groupBy("notes.id")
      .orderBy("notes.title")// para colocar o título em ordem alfabética
  } else{
    notes = await knex("notes").where({user_id}).whereLike("title", `%${title}%`).orderBy("title");
      // os %% indicam para verificar se existe a palavra "title"(é o campo em que eu quero faer a consulta) tanto antes, quanto depois da variável.
      // Como na parte de query do insomnia eu dei o valor de Nodejs ao title, o whereLike vai buscar pela palavra Nodejs em qualquer lugar dentro do title
  }

  //PARA VINCULAR AS TAGS quando der um send no index (index do insomnia, para filtrar as infos)
  // ver aulas do st08 Query builder> aula Maps e Filter, aula Obtendo tags da nota
  const userTags = await knex("tags").where({user_id});
  const notesWithTags = notes.map(note => {
    const noteTags = userTags.filter(tag => tag.note_id === note.id);

    return{
      ...note,
      tags: noteTags
    }
  });

  return response.json(notesWithTags);
 }
}

module.exports = NotesController;