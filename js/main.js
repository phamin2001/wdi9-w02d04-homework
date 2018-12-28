let arrayOfCards = [
    {
      name: "Bulbasaur",
      damage: 60,
      cardImage: 'images/Bulbasaur.png'
    }, {
      name: "Caterpie",
      damage: 40,
      cardImage: 'images/Caterpie.png'
    }, {
      name: "Charmander",
      damage: 60,
      cardImage: 'images/Charmander.png'
    }, {
      name: "Clefairy",
      damage: 50,
      cardImage: 'images/Clefairy.png'
    }, {
      name: "Jigglypuff",
      damage: 60,
      cardImage: 'images/Jigglypuff.png'
    }, {
      name: "Mankey",
      damage: 50,
      cardImage: 'images/Mankey.png'
    }, {
      name: "Meowth",
      damage: 60,
      cardImage: 'images/Meowth.png'
    }, {
      name: "Nidoran - female",
      damage: 60,
      cardImage: 'images/Nidoran - female.png'
    }, {
      name: "Nidoran - male",
      damage: 50,
      cardImage: 'images/Nidoran - male.png'
    }, {
      name: "Oddish",
      damage: 40,
      cardImage: 'images/Oddish.png'
    }, {
      name: "Pidgey",
      damage: 50,
      cardImage: 'images/Pidgey.png'
    }, {
      name: "Pikachu",
      damage: 50,
      cardImage: 'images/Pikachu.png'
    }, {
      name: "Poliwag",
      damage: 50,
      cardImage: 'images/Poliwag.png'
    }, {
      name: "Psyduck",
      damage: 60,
      cardImage: 'images/Psyduck.png'
    }, {
      name: "Rattata",
      damage: 30,
      cardImage: 'images/Rattata.png'
    }, {
      name: "Squirtle",
      damage: 60,
      cardImage: 'images/Squirtle.png'
    }, {
      name: "Vulpix",
      damage: 50,
      cardImage: 'images/Vulpix.png'
    }, {
      name: "Weedle", 
      damage: 40,
      cardImage: 'images/Weedle.png'
    }
  ];
let round = 1;
  const score = {
    player: 0,
    computer: 0
}
const roundsWon = {
    player: 0,
    computer: 0
}

  let playerRandomCards = [];     // each round it takes 3 unique cards
let computerRandomCards = [];   // each round it takes 3 unique cards

const createRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
}


const createRandomCardsForPlayers = (arrayOfCards) => {
    for (let x = 0; x < 3; x++) {
        let randomNum = createRandomNumber(arrayOfCards);
        playerRandomCards.push(arrayOfCards.splice(randomNum, 1)[0]);
        randomNum = createRandomNumber(arrayOfCards);
        computerRandomCards.push(arrayOfCards.splice(randomNum, 1)[0]);
    }
    console.log(`Arrays of 3 unique cards for each players: `);
    console.log("Cards of Player in this round: "); console.log(playerRandomCards);
    console.log("Cards of computer in this round: "); console.log(computerRandomCards);
}


const game = () => {
   

    // create a for loop for round which is 3
    for (let round = 0; round < 3; round++) {
        console.log(`Round: ${round + 1}`);
        
        // loop for play 3 cards 
        let i = 0;
        for (; i < 3; i++) {
            console.log("Player card is: "); console.log(playerRandomCards[i]);
            
           
            let playerDamage = playerRandomCards[i].damage; 
            let randNum = createRandomNumber(computerRandomCards);
            let computerDamage = computerRandomCards[randNum].damage; 
            console.log("Computer card is: "); console.log(computerRandomCards[randNum]);
            console.log("Player damage is: " + playerDamage);
            console.log("Computer damage is: " + computerDamage);
            
            if(playerDamage > computerDamage) {
                score.player ++;
                roundsWon.player++;
            } else if(playerDamage < computerDamage){
                score.computer++;
                roundsWon.computer++;
            } 
            console.log(`Score of round ${round + 1}`); console.log(score);
            console.log(`Rounds Won round ${round + 1}`); console.log(roundsWon);

            let j = i + 1;
            // player's cards left in his hand
            if(j < playerRandomCards.length) {
                console.log("Player's cards left: ");
                for(j; j < playerRandomCards.length; j++) {
                    console.log(playerRandomCards[j]);
                }

                // computer's cards left in its hand
                console.log("Computer's cards left: ");
                for(let c = 0; c < computerRandomCards.length; c++) {
                    if(c != randNum) {
                        console.log(computerRandomCards[c]);
                    }
                }
            }
        }
        
        playerRandomCards.length = 0;
        computerRandomCards.length = 0;
    }
}

const runTheGame = () => {
    console.log(arrayOfCards.length);
    $('#body').append(`<h4>Round: ${round}</h4>`);
    $('#body').append(`<h4>fdfa</h4>`);

    // while(arrayOfCards.length > 0 && (arrayOfCards.length % 6 === 0 || arrayOfCards.length / 6 >= 1)){
    //    game();
    // }
    // alert("Game is over!!");
}




////////////////////////////////Homework-W02D04////////////////////////////////

const displayGameCards = (e) => {
  $('.displayCards').empty();
  $('.displayGameCards').empty();
  createRandomCardsForPlayers(arrayOfCards);
  const $playerCards = $('<h3/>').text("Player Cards:");
  $('.displayGameCards').append($playerCards);
  for (let i = 0; i < 3; i++) {
    $('.displayGameCards').append(`<img src="images/Back.png"/>`);
  }
  const $computerCards = $('<h3/>').text("Computer Cards:");
  $('.displayGameCards').append($computerCards);
  for (let i = 0; i < 3; i++) {
    $('.displayGameCards').append(`<img src="images/Back.png"/>`);
  }
  runTheGame();
}

// show all cards at the begining of the game
$('.showCards').on('click', (e) => {
  if (playerRandomCards.length === 0 && computerRandomCards.length === 0){
    $('.displayCards').empty();
    $('.displayGameCards').empty();
    for(let i = 0; i < arrayOfCards.length; i++) {
      $('.displayCards').prepend(`<img src="${arrayOfCards[i].cardImage}"/>`);
    }
  } else {
    alert("Finish your cards before starting a new game!");
  }
});

// Start Game by selecting 3 random cards for user and 3 random cards for computer
$('.startGame').on('click', (e) => {
  displayGameCards(e);
});





