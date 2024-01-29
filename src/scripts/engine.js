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
    actions: {
        button: document.getElementById("next-duel"),
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

// Enumeracao De Cartas
const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf:[1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf:[2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf:[0],
        loseOf: [1],
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

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectedCard(IdCard);
        });

        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }
    return cardImage;
}

async function removeAllCardsImages() {

}

async function setCardsField(cardId){
    await removeAllCardsImages();

    //let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    let checkCards = document.getElementById("computer-cards").getElementsByClassName("playable");
    let computerCard = [];

    console.log(checkCards);
    for (let i = 0; i < checkCards.length; i++) {
        if(checkCards[i].style.display !== 'none'){
            //alert("diferente");
            computerCard[i] = checkCards[i];
        }
    }
    
    console.log(computerCard);
    if (computerCard.length > 0) {
        let computerCardId = Math.floor(Math.random() * computerCard.length);
        //console.log(computerCard);
        //console.log(computerCardId);
        //console.log(computerCard[computerCardId].getAttribute("data-id"));
        
        state.fieldCards.computer.src = cardData[computerCard[computerCardId].getAttribute("data-id")].img;


        console.log(computerCard[computerCardId]);
        computerCard[computerCardId].classList.remove("playable");
        computerCard[computerCardId].style.display = 'none';
        
    }
    

    state.fieldCards.player.src = cardData[cardId].img;
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
    //drawCards(5, "player");
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    //playerSides.player1;
    //state.score.playerScore++;
    //state.score.computerScore++;
    //state.cardSprites.name.innerHTML = "Dragão Azul";
    //state.score.scoreBox.textContent = `win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
    //document.getElementById("score_points").innerHTML = `win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

inicialize();
