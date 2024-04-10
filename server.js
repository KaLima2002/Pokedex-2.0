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

app.get('/AllPokemon', (req, res) => {
  var SqlQuery = 'SELECT p.Id as PokemonId, p.Name as PokemonName, p.Sprite,p.Description, GROUP_CONCAT(t.Name) as PokemonType, GROUP_CONCAT(t.IconColor) as IconColor, GROUP_CONCAT(t.BackgroundColor) as BackgroundColor FROM PokemonTypeTeste pt INNER JOIN PokemonTeste p on pt.PokemonId = p.id INNER JOIN Type t on pt.TypeId = t.id GROUP BY p.Id, p.Name, p.Sprite, p.Description limit 500; ';
  connection.query(SqlQuery, (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar consulta:', err);
        return;
    }
    
    res.json(results);
    });
});
/*
app.get('/Description/:PokemonId', (req, res) => {
  var SqlQuery = `SELECT Description FROM Pokemon Where Id = ${req.params.PokemonId} ;`;
  connection.query(SqlQuery, (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar consulta:', err);
        return;
    }
    res.json(results);
    });
});
*/
app.listen(PORT, () => {
  console.log(`API está hospedada corretamente na porta ${PORT}`);
});