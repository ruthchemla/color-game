// Import stylesheets
import './style.scss';

var redDisplay = document.querySelector(".red");
var greenDisplay = document.querySelector(".green");
var blueDisplay = document.querySelector(".blue");
const easyButton = document.querySelector(".easy");
const hardButton = document.querySelector(".hard");
var newColors = document.querySelector(".new-game");
var squaresList = document.querySelectorAll("li.square");
var headerElement = document.querySelector("header");

const BG_COLOR = "#4e82b4";
var isEasyGame = false;
var isGameOver = false;

function startGame() {
  isGameOver = false;
  headerElement.style.backgroundColor = BG_COLOR;
  var num = getNumberSquares();
  var colors = getRandomColors(num);
  for(var i = 0; i < num; i++){
      var color = colors[i];
      squaresList[i].style.visibility =  "visible";
      squaresList[i].style.backgroundColor = rgbToHex(color.red, color.green, color.blue);
  }
  //select the correct guess
  var index = getRandomValue(0,num - 1); 
  //set the header RGB display
  redDisplay.textContent = colors[index].red;
  greenDisplay.textContent = colors[index].green;
  blueDisplay.textContent = colors[index].blue;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
  
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
  
function getRandomColors(num){
    var colors = [];
    for(var i = 0; i < num; i++){
      var rgb = {
        red:getRandomValue(0, 255),
        green:getRandomValue(0, 255),
        blue:getRandomValue(0, 255) 
      }
      colors.push(rgb);
    } 
    return colors;
}

function isCorrectClick(rgb){
  return (rgb[0] == redDisplay.textContent && rgb[1] == greenDisplay.textContent && rgb[2] == blueDisplay.textContent);
}

function getNumberSquares(){
  return isEasyGame ? 3 : 6;
}

function onSquareClick(element){
    console.log("clicked!!! "+ element.style.backgroundColor);
    var backgroundColor = element.style.backgroundColor;
    var color = element.style.backgroundColor.slice(4,backgroundColor.indexOf(')')).split(', ');
    if(isCorrectClick(color)){
      isGameOver = true;
      newColors.textContent = "PLAY AGAIN?";
      headerElement.style.backgroundColor = backgroundColor;
      var num = getNumberSquares();
      for(var i = 0; i < num; i++){
      // squaresList.forEach(function(square){
        squaresList[i].style.visibility =  "visible";
        squaresList[i].style.backgroundColor = backgroundColor;
      }
    }
    else{
      //failed guess then this square disapears 
      element.style.visibility =  "hidden";
    }
}

newColors.addEventListener("click", function(){
  this.textContent = "NEW COLORS";
  startGame();
});

easyButton.addEventListener("click", function(){
  isEasyGame = true;
  isGameOver = false;
  for(var i = 3; i < squaresList.length; i++){
    squaresList[i].style.visibility = "hidden"
  }
  startGame();
});

hardButton.addEventListener("click", function(){
  isEasyGame = false;
  isGameOver = false;
  for(var i = 0; i < squaresList.length; i++){
    squaresList[i].style.visibility = "visible"
  }
  startGame();
});

squaresList.forEach(function(element){
    element.addEventListener("click", function(){
      if(!isGameOver){
        onSquareClick(element);
      }
    });
});

startGame();