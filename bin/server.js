require("dotenv/config");

const app = require("../src/app");

app.listen(process.env.PORT, () => {
  console.log(`Api rodando na porta ${process.env.PORT}`);
  console.log("Para finalizar a Api pressione Ctrl + C");
});
