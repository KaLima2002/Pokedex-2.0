const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/POKEMON', (req, res) => {
  const pokemon = {
    name: 'Pikachu',
    type: 'Electric',
    level: 25,
  };
  res.json(pokemon);
});

app.listen(PORT, () => {
  console.log(`API está hospedada corretamente na porta ${PORT}`);
});