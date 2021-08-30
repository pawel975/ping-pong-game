const btnDifficulty1 = document.querySelector(".difficulty-option-1");
const btnDifficulty2 = document.querySelector(".difficulty-option-2");
const btnDifficulty3 = document.querySelector(".difficulty-option-3");
const container = document.querySelector(".container");
const computerPlayer = document.querySelector(".computer-player");
const player = document.querySelector(".player");
const ball = document.querySelector(".ball");
const spanPoints = document.querySelector(".board-points__span");
const modalLoss = document.querySelector(".modal-loss");
const spanResult = document.querySelector(".points");
const btnRetry = document.querySelector(".retry");
const modalStart = document.querySelector(".modal-start");

let interval;

let points = 0;
let difficultySpeed = 50;

let playerY = 350;
let playerSurfaceSpots = [];

let ballY = 350;
let ballX = 55;
let ballDirectionY = Math.random() >= 0.5 ? "top" : "bottom";
let ballDirectionX = "right";

let computerY = 350;

player.style.bottom = playerY + "px";
ball.style.bottom = ballY + "px";
ball.style.left = ballX + "px";

const startGame = (e) => {
  const difficulty = Number(e.target.value);
  switch (difficulty) {
    case 0:
      difficultySpeed = 40;
      break;
    case 1:
      difficultySpeed = 30;
      break;
    case 2:
      difficultySpeed = 20;
      break;
    default:
      break;
  }
  modalStart.style.display = "none";
  container.style.display = "flex";
  interval = setInterval(() => {
    computerMovement();
    ballMovement();
  }, difficultySpeed);
  // Turn off that interval to stop the game
};

const playerSurfaceCalculation = () => {
  playerSurfaceSpots = [];
  for (let i = playerY - 7; i < playerY + 8; i++) {
    playerSurfaceSpots.push(playerY + (playerY - i) * 10);
  }
};

const playerMovement = (e) => {
  keySign = e.keyCode;
  switch (keySign) {
    case 40:
      if (playerY >= 60) playerY -= 20;
      player.style.bottom = playerY + "px";
      playerSurfaceCalculation();
      break;
    case 38:
      if (playerY <= 640) playerY += 20;
      player.style.bottom = playerY + "px";
      playerSurfaceCalculation();
      break;
    default:
      playerY = playerY;
  }
};

const ballMovement = () => {
  switch (ballDirectionX) {
    case "right":
      if (ballX < 945) {
        ballX += 10;
        ball.style.left = ballX + "px";
      } else if (ballX == 945) {
        if (playerSurfaceSpots.find((element) => element == ballY)) {
          ballDirectionX = "left";
          points++;
          spanResult.textContent = points;
          spanPoints.textContent = points;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            container.style.display = "none";
            modalLoss.style.display = "initial";
          }, 200);
        }
      }
      break;
    case "left":
      if (ballX > 55) {
        ballX -= 10;
        ball.style.left = ballX + "px";
      } else if (ballX == 55) {
        ballDirectionX = "right";
      }
      break;
    default:
      ballDirectionX = ballDirectionX;
  }

  switch (ballDirectionY) {
    case "top":
      if (ballY < 680) {
        ballY += 10;
        ball.style.bottom = ballY + "px";
      } else if (ballY == 680) {
        ballDirectionY = "bottom";
      }
      break;
    case "bottom":
      if (ballY > 20) {
        ballY -= 10;
        ball.style.bottom = ballY + "px";
      } else if (ballY == 20) {
        ballDirectionY = "top";
      }
      break;
    default:
      ballDirectionY = ballDirectionY;
      break;
  }
};

const computerMovement = () => {
  if (ballY <= 650 && ballY >= 50) {
    computerY = ballY;
    computerPlayer.style.bottom = computerY + "px";
  }
};

let count = 0;

btnDifficulty1.addEventListener("click", startGame);
btnDifficulty2.addEventListener("click", startGame);
btnDifficulty3.addEventListener("click", startGame);
window.addEventListener("keydown", playerMovement);
btnRetry.addEventListener("click", () => location.reload());
