async function GetAllPokemons() {
    var response = {};
    await fetch('http://localhost:3000/POKEMON').then(res => {
        return res.json().then(data => Object.assign(response, data) )
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
    return{ 
        response
    };
};

function CreateStyle(PokedexId,Type1,IconColor1,BackgroundColor1,Type2,IconColor2,BackgroundColor2){
    if(Type2 == undefined){
            let Type1Html = document.getElementById(Type1+PokedexId+"B");
            Type1Html.style.backgroundColor =BackgroundColor1;
            let backgroundType1 = document.getElementById(Type1+PokedexId);
            backgroundType1.style.background =IconColor1;
            
        }
    else if(Type2 != undefined){
            let TypeHtml = document.getElementById(Type1+Type2+PokedexId+"B");
            TypeHtml.style.background =`linear-gradient(135deg, ${BackgroundColor1}, ${BackgroundColor2})`;
            let backgroundType1 = document.getElementById(Type1+PokedexId+"A");
            backgroundType1.style.background =IconColor1;
            let backgroundType2 = document.getElementById(Type2+PokedexId+"A");
            backgroundType2.style.background =IconColor2;
        }

};

function AdicionarCard1(PokemonName,PokedexId, PokemonSprite, Type1, Type2){
    var NovoCard;
    if(Type2!= undefined){
         NovoCard = 
            `<div id=${PokemonName}>
            <div class="Pokemon-image" id="${Type1}${Type2}${PokedexId}B">
                <img src="${PokemonSprite}" id="PokemonSprite">
            </div>
            <div class="Pokemon-info">
                <p>
                    <span id="PokedexId">#${PokedexId}</span><span id="PokemonName">${PokemonName}</span>
                </p>
                <p id = "PokemonTypesModal">
                    <span class="PokemonType1" id="${Type1}${PokedexId}A">${Type1}</span>
                    <span class="PokemonType2" id="${Type2}${PokedexId}A">${Type2}</span>
                </p>
            </div>
        </div></div>`
    }
    else{
         NovoCard =
            ` <div id=${PokemonName}>
            <div class="Pokemon-image" id="${Type1}${PokedexId}B">
                <img src="${PokemonSprite}" id="PokemonSprite">
            </div>
            <div class="Pokemon-info">
                <p>
                    <span id="PokedexId">#${PokedexId}</span><span id="PokemonName">${PokemonName}</span>
                </p>
                <p id = "PokemonTypesModal">
                    <span class="PokemonType1" id="${Type1}${PokedexId}">${Type1}</span>
                </p>
            </div>
        </div></div>`
    }
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = NovoCard;
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.appendChild(newCard);
}


window.onload = async () => {
    allPokemons = (await GetAllPokemons()).response;
    const AmountPokemons = Object.keys(allPokemons).length;
    for(var i = 0; i < AmountPokemons; i++){
        var PokemonId = allPokemons[i].PokemonId;
        var PokemonName = allPokemons[i].PokemonName;
        var PokemonSprite = allPokemons[i].Sprite;
        var Type1;
        var IconColor1;
        var BackgroundColor1;
        if((allPokemons[i].PokemonType).indexOf(',') == -1){
            var Type1 = allPokemons[i].PokemonType;
            var IconColor1 = allPokemons[i].IconColor;
            var BackgroundColor1 = allPokemons[i].BackgroundColor;
            AdicionarCard1(PokemonName,PokemonId,PokemonSprite,Type1);
            CreateStyle(PokemonId,Type1,IconColor1,BackgroundColor1);
        }
        else{
            let StartSecondType = allPokemons[i].PokemonType.indexOf(',');
            Type1 = (allPokemons[i].PokemonType).substring(0,StartSecondType);
            var Type2 = (allPokemons[i].PokemonType).substring(StartSecondType+1);

            let StartSecondIcon = allPokemons[i].IconColor.indexOf(',');
            IconColor1 = (allPokemons[i].IconColor).substring(0,StartSecondIcon);
            var IconColor2 = (allPokemons[i].IconColor).substring(StartSecondIcon+1);

            let StartSecondBackground = allPokemons[i].BackgroundColor.indexOf(',');
            BackgroundColor1 = (allPokemons[i].BackgroundColor).substring(0,StartSecondBackground);
            var BackgroundColor2 = (allPokemons[i].BackgroundColor).substring(StartSecondBackground+1);
            AdicionarCard1(PokemonName,PokemonId,PokemonSprite,Type1,Type2);
            CreateStyle(PokemonId,Type1,IconColor1,BackgroundColor1,Type2,IconColor2,BackgroundColor2);
        }
    }
};
