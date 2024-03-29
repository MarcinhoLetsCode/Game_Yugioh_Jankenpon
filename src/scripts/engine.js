const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
        init: document.getElementById("start-duel"),
    },
};

// const playerSides = {
//     player1: "player-cards",
//     computer: "computer-cards",
// }

// Enumeracao De Cartas
const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf:[1],
        loseOf:[2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf:[2],
        loseOf:[0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf:[0],
        loseOf:[1],
    },
]

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");
    cardImage.classList.add("playable");


    document.getElementById("player-field-card").addEventListener("mouseover", ()=>{
        if (document.getElementById("player-field-card").getAttribute("data-id") !== "-1") {
            drawSelectedCard(document.getElementById("player-field-card").getAttribute("data-id"));
        }
        
    });

    document.getElementById("computer-field-card").addEventListener("mouseover", ()=>{
        if (document.getElementById("computer-field-card").getAttribute("data-id") !== "-1") {
            drawSelectedCard(document.getElementById("computer-field-card").getAttribute("data-id"));
        }
    });

    if (fieldSide === state.playerSides.player1 ) {
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectedCard(IdCard);
        });

        cardImage.addEventListener("click", ()=>{
            //console.log(cardImage);
            //console.log(cardImage.classList.contains("playable") === true);

            if(cardImage.classList.contains("playable")){
                let selected = document.getElementById("player-cards").querySelectorAll("img");
                selected.forEach((img) => {img.classList.add("playable")});
                // for (let i = 0; i < document.getElementById("player-cards").getElementsByClassName("card").length; i++) {
                //     document.getElementById("player-cards").getElementsByClassName("card")[i].classList.add("playable");
                // }
                setCardsField(cardImage.getAttribute("data-id"));
                cardImage.classList.remove("playable");
                state.actions.init.style.display = "block";
                state.actions.button.style.display = "none";
                state.fieldCards.computer.src = "./src/assets/icons/card-front.png";
            } else {
                cardImage.classList.add("playable");
                //alert('Selecionada Already');
                clearPlayer();
            }
            
        });
    }
    return cardImage;
}

async function clearPlayer() {
    state.fieldCards.player.src = "./src/assets/icons/card-front.png";
    state.fieldCards.player.setAttribute("data-id", "");
    state.actions.init.style.display = "none";
}

async function clearField() {
    state.fieldCards.player.src = "./src/assets/icons/card-front.png";
    state.fieldCards.player.setAttribute("data-id", "-1");
    state.fieldCards.computer.src = "./src/assets/icons/card-front.png";
    state.fieldCards.computer.setAttribute("data-id", "-1");
}

async function removeAllCardsImages() {
    // let {computerBOX, player1BOX} = state.playerSides;
    // let imgElements = computerBOX.querySelectorAll("img");
    // imgElements.forEach((img) => img.remove());
}

async function resetDuel() {
    if (document.getElementById("player-cards").getElementsByClassName("usada").length === 5) {
        let limparUsadas = document.getElementById("player-cards").querySelectorAll("img")
        limparUsadas.forEach((img) => img.classList.remove("usada"));
        state.actions.button.style.display = "none";
        clearField();
        inicialize();
    } else {
        //console.log(document.getElementById("player-cards").querySelectorAll("img").style.display = "block");
        //Avatar
        state.cardSprites.avatar.src = "";
        state.cardSprites.name.innerHTML = "Select a Card";
        state.cardSprites.type.innerText = "------/-------";

        //FieldCards
        state.fieldCards.player.src = "./src/assets/icons/card-front.png";
        state.fieldCards.computer.src = "./src/assets/icons/card-front.png";
        state.fieldCards.player.setAttribute("data-id", "-1");
        state.fieldCards.computer.setAttribute("data-id", "-1");
        state.actions.init.style.display = "none";
        state.actions.button.style.display = "none";
    }
}

async function initDuel(){
    state.actions.button.style.display = "block";
    state.actions.init.style.display = "none";
    //console.log(document.querySelector("#computer-cards").querySelectorAll("img"));
    let checkCards = document.getElementById("computer-cards").getElementsByClassName("playable");
    let computerCard = [];

    //console.log(checkCards);
    for (let i = 0; i < checkCards.length; i++) {
        if(checkCards[i].style.display !== 'none'){
            computerCard[i] = checkCards[i];
        }
    }
    
    //console.log(computerCard);
    if (computerCard.length > 0) {
        let computerCardId = Math.floor(Math.random() * computerCard.length);
        //console.log(computerCard);
        //console.log(computerCardId);
        //console.log(computerCard[computerCardId].getAttribute("data-id"));
        
        await DrawCardsInfield('computador', computerCard[computerCardId].getAttribute("data-id"));
        //state.fieldCards.computer.src = cardData[computerCard[computerCardId].getAttribute("data-id")].img;
        //state.fieldCards.computer.setAttribute("data-id", cardData[computerCard[computerCardId].getAttribute("data-id")].id);

        //console.log(computerCard[computerCardId]);
        computerCard[computerCardId].classList.remove("playable");
        computerCard[computerCardId].style.display = 'none';
    }
    //console.log(state.fieldCards.player.getAttribute("data-id"));
    //console.log(state.fieldCards.computer.getAttribute("data-id"));
    
    //state.fieldCards.player.src = cardData[cardId].img;

    document.getElementById("player-cards").classList.contains("playable");

    checkCards = document.getElementById("player-cards").querySelectorAll("img");

    checkCards.forEach((img) => {
        if (!img.classList.contains("playable")) {
            img.style.display = 'none';
            img.classList.add('usada');
        }
    });

    await removeAllCardsImages();

    let duelResults = await checkDuelResults(state.fieldCards.player.getAttribute("data-id"), state.fieldCards.computer.getAttribute("data-id"));

    await updateScore();
    await drawButton(duelResults);
}

async function updateScore() {
    state.score.scoreBox.innerText = `win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(texto){
    state.actions.button.innerText = texto.toUpperCase();
    //console.log(texto);
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(parseInt(computerCardId))) {
        duelResults = "winner";
        state.score.playerScore++;
        //await playAudio("win");
     } else if (playerCard.loseOf.includes(parseInt(computerCardId))) {
         duelResults = "loser";
         state.score.computerScore++;
         
     }

     if (duelResults == "winner" || duelResults == "loser") {
        await playAudio(duelResults);  
     }

    //console.log(playerCard);
    //console.log(computerCardId);

    //console.log(duelResults);
    return duelResults;
}

async function setCardsField(cardId){

    //let computerCardId = await getRandomCardId();

    await ShowHideCards(true);
    // state.fieldCards.player.style.display = "block";
    // state.fieldCards.computer.style.display = "block";

    // let checkCards = document.getElementById("computer-cards").getElementsByClassName("playable");
    // let computerCard = [];

    // console.log(checkCards);
    // for (let i = 0; i < checkCards.length; i++) {
    //     if(checkCards[i].style.display !== 'none'){
    //         computerCard[i] = checkCards[i];
    //     }
    // }
    
    // console.log(computerCard);
    // if (computerCard.length > 0) {
    //     let computerCardId = Math.floor(Math.random() * computerCard.length);
    //     //console.log(computerCard);
    //     //console.log(computerCardId);
    //     //console.log(computerCard[computerCardId].getAttribute("data-id"));
        
    //     state.fieldCards.computer.src = cardData[computerCard[computerCardId].getAttribute("data-id")].img;

    //     console.log(computerCard[computerCardId]);
    //     computerCard[computerCardId].classList.remove("playable");
    //     computerCard[computerCardId].style.display = 'none';
    // }

    await DrawCardsInfield('jogador', cardId);
    //state.fieldCards.player.src = cardData[cardId].img;
    //state.fieldCards.player.setAttribute("data-id", cardData[cardId].id);
}

async function DrawCardsInfield(player, cardId){
    if (player === 'jogador') {
        state.fieldCards.player.src = cardData[cardId].img;
        state.fieldCards.player.setAttribute("data-id", cardData[cardId].id);
    } else if (player === 'computador') {
        state.fieldCards.computer.src = cardData[cardId].img;
        state.fieldCards.computer.setAttribute("data-id", cardData[cardId].id);
    }
}

async function ShowHideCards(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }
}

async function drawSelectedCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();        
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        //console.log(fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

function inicialize() {
    //state.fieldCards.player.style.display = "none";

    //drawCards(5, "player");
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.2;
    bgm.play();

    //playerSides.player1;
    //state.score.playerScore++;
    //state.score.computerScore++;
    //state.cardSprites.name.innerHTML = "Dragão Azul";
    //state.score.scoreBox.textContent = `win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
    //document.getElementById("score_points").innerHTML = `win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);

    try {
        audio.play();
    } catch {

    }
    
}

inicialize();
