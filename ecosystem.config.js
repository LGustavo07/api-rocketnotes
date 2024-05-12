module.exports = {
  apps : [
    {
      name: "app",
      script: "./src/server.js", // acessar o arquivo de inicialização, que no caso é o server.js
      instances: 1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
}
