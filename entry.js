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

// const params = {
//   canvas_id:    "world",
//   cell_width:   20,
//   cell_height:  20,
//   init_cells:   util.randomStart(70, .2),
//   colorful: true
// }
//
// const board = new GameOfLife(params)

gameView.start();



//
// canvasEl.height = window.innerHeight;
// canvasEl.width = window.innerWidth;
//
// const img = new Image();
// img.src = "maze.gif";
//
// ctx.drawImage(img, 0, 0);
// const gameView = new GameView(canvasEl.width, canvasEl.height);
