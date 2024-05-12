module.exports = {
  bail: true, // se um teste falhar, para de executar os testes
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"  // **/ significa "dentro de qualquer pasta", /* dentro de arquivo com qualquer nome, .spec.js é o arquivo de teste que também poderia ser escrito como .test.js. O <rootDir>/src já vai ignorar a pasta node_modules
  ],
}
