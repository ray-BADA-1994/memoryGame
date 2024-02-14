const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
];

const updaterArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
];
// shuffle the cardArray randomly
cardArray.sort(() => 0.5 - Math.random());

// VARIABLES
const startBtn = document.querySelector('.start-btn');
const welcomeScreen = document.querySelector('.welcome-screen');
const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const numberOfTries = document.querySelector("#number-of-tries");
const gameLevelNumber = document.querySelector("#game-level-number");
const gameStatus = document.querySelector("#game-status");
const totalNumberOfTriesPerLevel = document.querySelector(
  "#total-number-of-tries-per-level"
);
let cardsChosen = [];
let cardsChosenId = [];
const cardsWon = [];
let count = 5; // There is some math needed to determine this value but for now we will just choose 5.
let numOfTries = 0;
let level = 1;

startBtn.addEventListener('click', handleStart)

// setting the textcontent of the gamelevelNumber.
gameLevelNumber.textContent = level;

function handleStart(e) {
   e.preventDefault();
   welcomeScreen.style.display = "none";
}

function createBoard() {
  console.log(cardArray.length);

  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
  TotalNumberOfTriesPerLevel();
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];
  count--;
  numOfTries++;
  numberOfTries.textContent = numOfTries;

  // This checks if you clicked on the same img twice!
  if (optionOneId == optionTwoId) {
    alert("You have clicked the same image");
    cardsChosen.pop();
    cardsChosenId.pop();
    return;
  }

  // This checks if the first and second picks are the same.
  if (cardsChosen[0] == cardsChosen[1]) {
    alert("Match Found!!");
    cards[optionOneId].setAttribute("src", "images/white.png");
    cards[optionTwoId].setAttribute("src", "images/white.png");
    // remove event listerner.
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    // keeping track of the cards won.
    cardsWon.push(cardsChosen);
    resultDisplay.textContent = cardsWon.length;
  } else {
    setTimeout(() => {
      alert("Match not found. Try Again!!");
    }, 200);
    setTimeout(() => {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
    }, 300);
  }
  // This checks if you won, but checking that the number of accurate guesses is equal to the number of the maximum accurate guesses possible.
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations you found all!";
  }

  setTimeout(() => {
    checkNoTries();
  }, 500);
  clearTheArrays();
}

function checkNoTries() {
  switch (level) {
    case 1:
      if (count == 0 && cardsWon.length < 3) {
        gameStatus.textContent = "Failed!! Exceeded Number of tries!!";
        document.querySelector("main").style.color = "red";
        document.querySelector("main").style.pointerEvents = "none";
        resetResultDisplayAndNumOfTriesTextcontent();
        updateCount(5);
        resetLevel();
        return;
          } else if (count == 0 && cardsWon >= 3) {
        newLevelIntroMessage(2);
        resizeGridDisplay();
        resetResultDisplayAndNumOfTriesTextcontent();
        updateCount(8);
        updateLevel(2);
        gameLevelNumber.textContent = level;
        cardArray.push(...updaterArray);
        resetMainStylesAndStatus(); // resets the main styles and remove status text
        resetBoard(); // removes former img element
        createBoard(); // creates new img element from the now updated cardArray
        clearTheArrays(); // clears the cardchosen and cardchosenid arrays
        return;
      }
      break;
    case 2:
      if (count == 0 && cardsWon.length < 4) {
        gameStatus.textContent = "Failed!! Exceeded Number of tries!!";
        document.querySelector("main").style.color = "red";
        document.querySelector("main").style.pointerEvents = "none";
        resetResultDisplayAndNumOfTriesTextcontent();
        updateCount(8);
        resetLevel();
        return;
      } else if ((count = 0 && cardsWon.length >= 4)) {
        newLevelIntroMessage(3);
        resizeGridDisplay();
        resetResultDisplayAndNumOfTriesTextcontent();
        updateCount(10);
        updateLevel(3);
        gameLevelNumber.textContent = level;
        cardArray.push(...updaterArray);
        resetMainStylesAndStatus(); // resets the main styles and remove status text
        resetBoard(); // removes former img element
        createBoard(); // creates new img element from the now updated cardArray
        clearTheArrays(); // clears the cardchosen and cardchosenid arrays
        return;
      }
      break;
    case 3:
      if (count == 0 && cardsWon.length < 7) {
        gameStatus.textContent = "Failed!! Exceeded Number of tries!!";
        document.querySelector("main").style.color = "red";
        document.querySelector("main").style.pointerEvents = "none";
        resetResultDisplayAndNumOfTriesTextcontent();
        updateCount(10);
        resetLevel();
        return;
      } else if ((count = 0 && cardsWon.length >= 4)) {
        gameOver();
        return;
      }
      break;
    default:
      break;
  }
}

function resetLevel() {
  setTimeout(() => {
    document
      .querySelectorAll("img")
      .forEach((ele) => ele.setAttribute("src", "images/blank.png"));
    clearTheArrays();
    resetMainStylesAndStatus();
  }, 2000);
}

function flipCard(e) {
  const cardId = this.getAttribute("data-id");
  this.setAttribute("src", cardArray[cardId].img);
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  if (cardsChosen.length === 2) {
    checkMatch();
  }
}

function TotalNumberOfTriesPerLevel() {
  switch (level) {
    case 1:
      totalNumberOfTriesPerLevel.textContent = 5;
      break;
    case 2:
      totalNumberOfTriesPerLevel.textContent = 8;
      break;
    case 3:
      totalNumberOfTriesPerLevel.textContent = 10;
    default:
      break;
  }
}

function clearTheArrays() {
  cardsChosen = [];
  cardsChosenId = [];
}

function resetMainStylesAndStatus() {
  gameStatus.textContent = "";
  document.querySelector("main").style.color = "black";
  document.querySelector("main").style.pointerEvents = "initial";
}

function resetBoard() {
  document.querySelectorAll("img").forEach((ele) => ele.remove());
}

function newLevelIntroMessage(levelNum) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const messageContainer = document.createElement("p");
  messageContainer.className = "message";

  const congratulationsMessage = document.createElement("span");
  congratulationsMessage.textContent = "Congratulations you made it!";
  congratulationsMessage.className = "c-message";
  messageContainer.appendChild(congratulationsMessage);

  const welcomeMessage = document.createElement("span");
  welcomeMessage.textContent = `Welcome to Level ${levelNum}`;
  messageContainer.appendChild(welcomeMessage);

  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Continue";
  continueBtn.className = "btn";
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });
  messageContainer.appendChild(continueBtn);

  modal.appendChild(messageContainer);
  document.body.appendChild(modal);
}

function gameOver() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const messageContainer = document.createElement("p");
  messageContainer.className = "message";

  const congratulationsMessage = document.createElement("span");
  congratulationsMessage.textContent = "Congratulations You Win!";
  congratulationsMessage.className = "c-message";
  messageContainer.appendChild(congratulationsMessage);

  const welcomeMessage = document.createElement("span");
  welcomeMessage.textContent =
    "Please click the button below to restart the game!";
  messageContainer.appendChild(welcomeMessage);
  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Continue";
  continueBtn.className = "btn";
  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    //   resetResultDisplayAndNumOfTriesTextcontent();
    //   updateCount(5);
    //   resetLevel();
    location.reload();
    welcomeScreen.style.display = "none";
  });
  messageContainer.appendChild(continueBtn);

  modal.appendChild(messageContainer);
  document.body.appendChild(modal);
}

function resizeGridDisplay() {
  if (window.screen.width > 768) {
    gridDisplay.style.width = "600px";
  }
}

function resetResultDisplayAndNumOfTriesTextcontent() {
  resultDisplay.textContent = "";
  numberOfTries.textContent = "";
  numOfTries = 0;
}

function updateCount(value) {
  count = value;
}

function updateLevel(value) {
  level = value;
}
