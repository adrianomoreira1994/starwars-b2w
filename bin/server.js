const app = require('../src/app');
const config = require('./config');

app.listen(config.port, () => {
  console.log(`Api rodando na porta ${config.port}`);
  console.log('Para finalizar a Api pressione Ctrl + C');
});
