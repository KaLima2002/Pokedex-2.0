const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;


const mysql = require('mysql2');

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'K@rlinhos123',
    database: 'pokedex'
    });

    connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem sucedida.');
    });

app.use(cors());

app.get('/POKEMON', (req, res) => {
  var SqlQuery = 'SELECT p.Id as PokemonId, p.Name as PokemonName, p.Sprite, GROUP_CONCAT(t.Name) as PokemonType, GROUP_CONCAT(t.IconColor) as IconColor, GROUP_CONCAT(t.BackgroundColor) as BackgroundColor FROM PokemonType pt INNER JOIN Pokemon p on pt.PokemonId = p.id INNER JOIN Type t on pt.TypeId = t.id GROUP BY p.Id, p.Name, p.Sprite limit 1000;';
  connection.query(SqlQuery, (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar consulta:', err);
        return;
    }
    connection.end();
    res.json(results);
    });
});

app.listen(PORT, () => {
  console.log(`API está hospedada corretamente na porta ${PORT}`);
});