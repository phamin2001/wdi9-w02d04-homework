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
let round = 0;
const score = {
    player: 0,
    computer: 0
}
const roundsWon = {
    player: 0,
    computer: 0
}

let numberOfCardsPlayed = 0;

let arrayOfRandomNum = [];
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


const playCards = () => {
  displayGameCards();
  displayResults();

  $('.pcard').click(function() {
    numberOfCardsPlayed++;
    console.log( `number of cars played in playCards: ${numberOfCardsPlayed}`);
    let idOfCard = $(this).attr('id');
    const index = parseInt(idOfCard.charAt(0));
    let playerDamage = playerRandomCards[index].damage; 
    $(this).hide();
    $(this).replaceWith(`<img src="${playerRandomCards[index].cardImage}"/>`);

    let randNum = createRandomNumber(computerRandomCards);
    while (arrayOfRandomNum.length > 0 && (arrayOfRandomNum.includes(randNum))) {
      randNum = createRandomNumber(computerRandomCards);
    }
    arrayOfRandomNum.push(randNum);
    let computerDamage = computerRandomCards[randNum].damage; 
    $(`#${randNum}th-computer-card`).replaceWith(`<img src="${computerRandomCards[randNum].cardImage}"/>`); 
    
    if(playerDamage > computerDamage) {
      score.player ++;
      roundsWon.player++;
    } else if(playerDamage < computerDamage){
      score.computer++;
      roundsWon.computer++;
    } 
    displayResults();

    if(numberOfCardsPlayed === 3) {
      round++;
      playerRandomCards.length = 0;
      computerRandomCards.length = 0;
      numberOfCardsPlayed = 0;
    }
  });
}


const game = () => {
  playCards();
}

const runGame = () => {
  if(round === 3) {
    alert("game over");
  } else {
    game();
  }
}

const displayResults = () => {
    // console.log(arrayOfCards.length);
    $('.displayGameCards').prev().remove();
    $('.displayGameCards').prev().remove();
    $('.displayGameCards').prev().remove();
    const $round = $(`<h4>Round: ${round}</h4>`);
    $round.insertBefore('.displayGameCards');
    const $score = $(`<h4>Score of Player: ${score.player}   Score of Computer: ${score.computer}</h4>`);
    $score.insertBefore('.displayGameCards');
    const $roundsWon = $(`<h4>Rounds of Won_Player: ${roundsWon.player} <<<<>>>>>  Rounds of Won_Computer: ${roundsWon.computer}</h4>`)
    $roundsWon.insertBefore('.displayGameCards');
}


const displayGameCards = () => {
  $('.displayCards').empty();
  $('.displayGameCards').empty();
  createRandomCardsForPlayers(arrayOfCards);
  console.log(`arrayofcards: `); console.log(arrayOfCards);
  const $playerCards = $('<h3/>').text("Player Cards:");
  $('.displayGameCards').append($playerCards);
  for (let i = 0; i < 3; i++) {
    $('.displayGameCards').append(`<img id="${i}th-player-card" class="pcard" src="images/Back.png"/>`);
  }
  const $computerCards = $('<h3/>').text("Computer Cards:");
  $('.displayGameCards').append($computerCards);
  for (let i = 0; i < 3; i++) {
    $('.displayGameCards').append(`<img id="${i}th-computer-card" class="ccard" src="images/Back.png"/>`);
  }
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
  runGame();
});