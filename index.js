let player = {
    chips: 100
};

let isAlive = false;
let dealerAlive = false;
let sum = 0;
let dSum = 0;
let cards = [];
let dCards =[];
let message = "";
let dMessage = "";
let hasBlackJack = false;
let dealerHasBlackJack = false;
const cardsEle = document.getElementById("cards-ele");
const sumEle = document.getElementById("sum-ele");
const messageEle = document.getElementById("message-ele");
const playerEle = document.getElementById("player");
const dCardsEle = document.getElementById("dcards-ele");
const dSumEle = document.getElementById("dSum-ele");
const dMessageEle = document.getElementById("dMessage-ele");
const stayEle = document.getElementById("stay-ele");
const startEle = document.getElementById("start-ele");

playerEle.textContent = "$" + player.chips;

function startGame(){
    isAlive = true;
    dealerAlive = true;
    hasBlackJack = false;
    dealerHasBlackJack = false
    let card1 = randomCard();
    let card2 = randomCard();
    let card3 = randomCard();
    let card4 = randomCard();
    cards = [card1, card2];
    sum = card1 + card2;
    dCards = [card3, card4];
    dSum = card3 + card4;
    renderGame()
    startEle.textContent = "NEW GAME"
   
};

function renderGame(){
    cardsEle.textContent = "CARDS: ";
        for (let i = 0; i < cards.length; i++){
            cardsEle.textContent += cards[i] + " ";
        };

    sumEle.textContent = "SUM: " + sum;

        if (sum <= 20){
            message = "Would you like another card?";      
        }else if (sum === 21){
            message = "BLACKJACK BABY!!"
            hasBlackJack = true;
        }else {
            message = "Bust, house wins"
            isAlive = false;
        };

    messageEle.textContent = message;

    dCardsEle.textContent = "CARDS: ";
        for (let j = 0; j < dCards.length; j++){
            dCardsEle.textContent += dCards[j] + " ";
        };

    dSumEle.textContent = "SUM: " + dSum; 
};

function dealerRender(){
    if (dSum < 17){
        dMessage = "Dealer hits."; 
        dealerDrawCard()   
    }else if (dSum === 21){
        dMessage = "Dealer Has Blackjack"
        dealerHasBlackJack = true;
    }else if (dSum <= 20){
        dMessage = "Dealer stays."
        isAlive = false;
    } else {
        dMessage = "Dealer busts, you win"
        isAlive = false;
};

    dMessageEle.textContent = dMessage;

};

function randomCard() {
    let random = Math.floor(Math.random() * 13) +1
        if (random > 10){
            return 10
        }else if (random === 1 ){
            return 11
        }else {
            return random
        };
};

function drawCard(){
    if (isAlive === true && hasBlackJack === false) {
        let card = randomCard()
        sum += card
        cards.push(card)
        renderGame()  
        dealerRender()      
    };
    
};

function stay() {
    message = "Player stays."
    messageEle.textContent = message; 
    if (dealerAlive === true && dealerHasBlackJack === false){
        dealerRender();
        score();
    }
};

function dealerDrawCard(){
    if (dealerAlive === true && dealerHasBlackJack === false) {
        let dCard = randomCard()
        dSum += dCard
        dCards.push(dCard)
        renderGame()
       
    };
};

function score(){
    if (sum === 21){
        playerEle.textContent = player.chips += 50
    }else if (sum > dSum ){
        playerEle.textContent = player.chips += 25
        message = "PLAYER WINS"
    }else if (sum < dSum ) { 
        playerEle.textContent = player.chips -= 25
        message = "DEALER WINS"
    }else if (sum = dSum){
       message = "PUSH"
    }
    messageEle.textContent = message; 
    dMessageEle.textContent = message;
};