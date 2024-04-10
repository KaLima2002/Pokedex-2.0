async function GetAllPokemons() {
    var response = {};
    await fetch('http://localhost:3000/AllPokemon').then(res => {
        return res.json().then(data => Object.assign(response, data) )
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
    return{ 
        response
    };
};

async function PokedexDescription(Id) {
    var response = {};
    await fetch(`http://localhost:3000/Description/${Id}`).then(res => {
        return res.json().then(data => Object.assign(response, data) )
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
    return{ 
        response
    };
};

function Separate(Text){
    Itens =[];
    let StartSecond = Text.indexOf(',');
    Itens[0] = Text.substring(0,StartSecond);
    Itens[1] = Text.substring(StartSecond+1);
    return Itens;
}

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

function CreateModal(PokemonName,PokedexId,PokemonSprite,PokedexEntry, Type1, Type2){
    const modal = document.createElement('div');
    modal.id = `${PokemonName}Modal`;
    modal.className = 'modal';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    if(Type2!= undefined){
        modalContent.innerHTML = `
        <span id="PokedexIdModal">${PokedexId}</span><span id="PokemonNameModal">${PokemonName}</span>
        <span class= "close" id="close${PokemonName}">&times;</span>
        <img src="${PokemonSprite}" id="PokemonSpriteModal">
        <p id = "PokemonTypesModal">
            <span class="PokemonType1" id="${Type1}Modal">${Type1}</span>
            <span class="PokemonType1" id="${Type2}Modal">${Type2}</span>
        </p>
        <p id="PokedexEntry">${PokedexEntry}</p>
        `;
    }
    else{
        modalContent.innerHTML = `
            <span id="PokedexIdModal">${PokedexId}</span><span id="PokemonNameModal">${PokemonName}</span>
            <span class= "close" id="close${PokemonName}">&times;</span>
            <img src="${PokemonSprite}" id="PokemonSpriteModal">
            <p id = "PokemonTypesModal">
                <span class="PokemonType1" id="${Type1}Modal">${Type1}</span>
            </p>
            <p id="PokedexEntry">${PokedexEntry}</p>
    `;
    }
     modal.appendChild(modalContent);
     document.body.appendChild(modal);
}

function CreateModalStyle(Type1,IconColor1, Type2,IconColor2){
    if(Type2 == undefined){
            let Type1Html = document.getElementById(Type1+"Modal");
            Type1Html.style.backgroundColor =IconColor1;
        }
    else if(Type2 != undefined){
            let backgroundType1 = document.getElementById(Type1+"Modal");
            backgroundType1.style.background =IconColor1;
            let backgroundType2 = document.getElementById(Type2+"Modal");
            backgroundType2.style.background =IconColor2;
        }
}


window.onload = async () => {
    allPokemons = (await GetAllPokemons()).response;
    const AmountPokemons = Object.keys(allPokemons).length;
    for(var i = 0; i < AmountPokemons; i++){
        var PokemonId = allPokemons[i].PokemonId;
        var PokemonName = allPokemons[i].PokemonName;
        var PokemonSprite = allPokemons[i].Sprite;
        if((allPokemons[i].PokemonType).indexOf(',') == -1){
            var Type1 = allPokemons[i].PokemonType;
            var IconColor1 = allPokemons[i].IconColor;
            var BackgroundColor1 = allPokemons[i].BackgroundColor;
            AdicionarCard1(PokemonName,PokemonId,PokemonSprite,Type1);
            CreateStyle(PokemonId,Type1,IconColor1,BackgroundColor1);
        }
        else{
            var Types = Separate(allPokemons[i].PokemonType);
            var IconColors = Separate(allPokemons[i].IconColor);
            var BackgroundColors = Separate(allPokemons[i].BackgroundColor);
            AdicionarCard1(PokemonName,PokemonId,PokemonSprite,Types[0],Types[1]);
            CreateStyle(PokemonId,Types[0],IconColors[0],BackgroundColors[0],Types[1],IconColors[1],BackgroundColors[1]);
        }
    };
    Object.values(allPokemons).forEach(element => {
        var PokemonDiv = document.getElementById(element.PokemonName);
        PokemonDiv.addEventListener('click', () => {
            var ChosenName = PokemonDiv.id;   
            var ChosenId = PokemonDiv.querySelector("#PokedexId").textContent;
            var ChosenSprite = PokemonDiv.querySelector("#PokemonSprite").src;
            var ChosenType1 = PokemonDiv.getElementsByClassName("PokemonType1")[0].textContent;
            var ChosenType2;
            var id = ChosenId.substring(1);
            var ChosenPokedexEntry = allPokemons[id-1].Description;
            if(PokemonDiv.getElementsByClassName("PokemonType2").length ==1){
                ChosenType2 = PokemonDiv.getElementsByClassName("PokemonType2")[0].textContent;
                CreateModal(ChosenName,ChosenId,ChosenSprite,ChosenPokedexEntry,ChosenType1,ChosenType2);
                CreateModalStyle(ChosenType1,Separate(allPokemons[id-1].IconColor)[0],ChosenType2,Separate(allPokemons[id-1].IconColor)[1]);
            }
            else{
                CreateModal(ChosenName,ChosenId,ChosenSprite,ChosenPokedexEntry,ChosenType1);
                CreateModalStyle(ChosenType1,allPokemons[id-1].IconColor);
            }
            var modal = document.getElementById(`${PokemonDiv.id}Modal`);
            modal.style.display = "block";
            var CloseDivPokemon = ('close'+`${PokemonDiv.id}`);
            var CloseDiv = document.getElementById(CloseDivPokemon);
            CloseDiv.addEventListener('click', () => {
            document.body.removeChild(modal)
            })
        });
    });
    
};
