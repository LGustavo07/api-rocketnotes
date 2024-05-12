const {hash} = require("bcryptjs"); // para a criptografia
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository){ // construtor é da classe, por isso fica avaixo dela, e não dentro de outra função
    this.userRepository = userRepository; // com o "this." deixo disponível globalmente
  }
 
  async execute({name, email, password}){     
    const checkUserExists = await this.userRepository.findByEmail(email);
  
    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8); // os dois parameros dentro dos parenteses são: tipo de dado, e fator de complexidade

    const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

    return userCreated;

  }
}

module.exports = UserCreateService;