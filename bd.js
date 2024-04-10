function CapitalizeFirsty(Word) {
    const firstLetter = Word.charAt(0).toUpperCase(); 
    const remainingLetters = Word.substring(1);
    return firstLetter + remainingLetters;
};

async function CreatePokemon(Name,Sprite,Description) {
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
      var Teste = 'PokemonTeste';
      var Real = 'Pokemon'
      connection.query(`Insert into ${Real}(Name,Sprite,Description) values('${Name}','${Sprite}','${Description}');`, (err, results, fields) => {
      if (err) {
          console.error('Erro ao executar consulta:', err);
          return;
      }
      connection.end();
      console.log(results);
      });
  }

async function CreatePokemonType(PokemonId,TypeId) {
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
      var Teste = 'PokemonTypeTeste';
      var Real = 'PokemonType'
      connection.query(`Insert into ${Real}(PokemonId,TypeId) values(${PokemonId},${TypeId});`, (err, results, fields) => {
      if (err) {
          console.error('Erro ao executar consulta:', err);
          return;
      }
      connection.end();
      console.log(results);
      });
  }
  


async function CallAPIBase(Id) {
    var response = {};
    await fetch('https://pokeapi.co/api/v2/pokemon/' + Id)
        .then(res => {
            return res.json().then(data => Object.assign(response, data) )
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    return{ 
        PokemonName: response.name,
        PokedexId: response.id,
        PokemonSprite: response.sprites.other.home.front_default,
        PokemonTypes: response.types
    };
}

async function CallAPIPokedex(Id) {
    var response = {};
    await fetch('https://pokeapi.co/api/v2/pokemon-species/' + Id)
        .then(res => {
            return res.json().then(data => Object.assign(response, data))
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
        return{ 
            PokedexEntry: response.flavor_text_entries[1].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ').replace("'","").replace("'s",'s'),
        }
}

async function InsertPokemon() {
    for(let i =1; i<494;i++){
        var BaseData = await CallAPIBase(i);
        var PokedexData = await CallAPIPokedex(i);
        CreatePokemon((CapitalizeFirsty(BaseData.PokemonName)),BaseData.PokemonSprite,PokedexData.PokedexEntry);
        //console.log((CapitalizeFirsty(BaseData.PokemonName)),BaseData.PokemonSprite,PokedexData.PokedexEntry);
        console.log(`${CapitalizeFirsty(BaseData.PokemonName)} cadastrado`)
    }
}

async function InsertPokemonType() {
    for(let i =1; i<494;i++){
        var BaseData = await CallAPIBase(i);
        var Type = ["default", "Grass", "Poison", "Bug",'Normal','Fighting','Flying','Ground','Rock','Ghost','Steel','Fire','Water','Electric','Psychic','Ice','Dragon','Dark','Fairy'];
        if(BaseData.PokemonTypes[1] == null){
            TypeId1 = Type.indexOf(CapitalizeFirsty(BaseData.PokemonTypes[0].type.name));
            await CreatePokemonType(BaseData.PokedexId,TypeId1);
        }
        else{
            TypeId1 = Type.indexOf(CapitalizeFirsty(BaseData.PokemonTypes[0].type.name));
            await CreatePokemonType(BaseData.PokedexId,TypeId1);

            TypeId2 = Type.indexOf(CapitalizeFirsty(BaseData.PokemonTypes[1].type.name));
            await CreatePokemonType(BaseData.PokedexId,TypeId2);
        };
    }
}

//InsertPokemon();
//InsertPokemonType();