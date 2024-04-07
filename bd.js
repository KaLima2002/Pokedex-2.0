async function Teste() {
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

    connection.query('Insert', (err, results, fields) => {
    if (err) {
        console.error('Erro ao executar consulta:', err);
        return;
    }
    return results;
    connection.end();
    });
}


//Usar essa classe aqui para inserir os dados do banco