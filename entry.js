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

key("space", () => {
  // debugger
  if (!gameView.inProgress) {
    infoEl.className = "info-wrapper center group gone"
		canvasEl.className = "visible fade-in"
		// newGame.className = "info gone"
		// toolTip.className = "gone"

		gameView.start();
  }
})
// el.addEventListener("keydown", (event) => {
//   if (event.which === 32 && !gameView.inProgress) {
//     infoEl.className = "info-wrapper center group gone"
// 		canvasEl.className = "visible fade-in"
// 		// newGame.className = "info gone"
// 		// toolTip.className = "gone"
//
// 		gameView.start();
//   }
// }

gameView.start();
