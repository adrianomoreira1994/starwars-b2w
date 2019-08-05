require("dotenv/config");

const app = require("../src/app");

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Api rodando na porta ${port}`);
  console.log("Para finalizar a Api pressione Ctrl + C");
});
