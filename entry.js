const GameView = window.GameView = require('./gameView.js');
// const mazeWidth = 482;
// const mazeHeight = 482;

const canvasEl = document.getElementById("world");


canvasEl.height = window.innerHeight;
canvasEl.width = window.innerWidth;

const ctx = canvasEl.getContext('2d');
const gameView = new GameView(canvasEl.height, canvasEl.width, ctx);

const el = document.getElementsByTagName('body')[0];

gameView.start(ctx);



//
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;
//
// const img = new Image();
// img.src = "maze.gif";
//
// ctx.drawImage(img, 0, 0);
// const gameView = new GameView(canvasEl.width, canvasEl.height);
