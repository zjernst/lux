const GameView = window.GameView = require('./gameView.js');
const GameOfLife = window.GameOfLife = require('./gameOfLife.js');
const Util = require('./util');
const util = new Util ();
// const mazeWidth = 482;
// const mazeHeight = 482;

const canvasEl = document.getElementById("world");


canvasEl.height = window.innerHeight;
canvasEl.width = window.innerWidth;

const ctx = canvasEl.getContext('2d');
const gameView = new GameView(ctx);

const el = document.getElementsByTagName('body')[0];
const infoEl = document.getElementById("info");
const boxWrapper = document.getElementById('box-wrapper');
let landingStage = true;
const landing = document.getElementById('landing');
const newGame = document.getElementById('new-game');
const lostGame = document.getElementById('lost-game');

key("space", () => {
  if (landingStage) {
    gameView.tutorial();
    landing.className = "landing gone";
    canvasEl.className = "visible fade-in";
    newGame.className = "info";
    boxWrapper.className = "box-wrapper";
    landingStage = false;
  } else if (!gameView.inProgress) {
    infoEl.className = "info-wrapper center group gone";
    lostGame.className = "info gone";
    canvasEl.className = "visible fade-in";
    // newGame.className = "info gone"
    // toolTip.className = "gone"
    gameView.resetScore();
    gameView.start();
  }
  // key("space", () => {
  //   // debugger
  //   if (!gameView.inProgress && !landing) {
  //   }
  // });
  // landing = false;
})

// gameView.start();
