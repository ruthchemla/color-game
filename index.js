// Import stylesheets
import './style.scss';

var redDisplay = document.querySelector(".red");
var greenDisplay = document.querySelector(".green");
var blueDisplay = document.querySelector(".blue");
var easyButton = document.querySelector(".easy");
var hardButton = document.querySelector(".hard");
var newColors = document.querySelector(".new-game");
var squaresList = document.querySelectorAll("li.square");
var modeButtons = document.querySelectorAll(".mode");

var BG_COLOR = "#4e82b4";
var isEasyGame = false;
var isGameOver = false;

function startGame() {
  isGameOver = false;
  document.querySelector("header").style.backgroundColor = BG_COLOR;
  var num = isEasyGame ? 3 : 6;
  var colors = getRandomColors(num);
  for(var i = 0; i < num; i++){
      var color = colors[i];
      squaresList[i].style.backgroundColor = rgbToHex(color.red, color.green, color.blue);
  }
  //select the correct guess
  var index = getRandomValue(0,5); 
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

function onSquareClick(element){
    console.log("clicked!!! "+ element.style.backgroundColor);
    var bkgColor = element.style.backgroundColor;
    var color = element.style.backgroundColor.slice(4,bkgColor.indexOf(')')).split(', ');
    if(isCorrectClick(color)){
      isGameOver = true;
      newColors.textContent = "PLAY AGAIN?";
      document.querySelector("header").style.backgroundColor = bkgColor;
      squaresList.forEach(function(square){
          square.style.backgroundColor = bkgColor;
        });
      }
    else{
      element.style.backgroundColor =  "#232323";
    }
}

modeButtons.forEach(function(element){
  element.addEventListener("mouseout", function(){
  this.style.color = "inherit";
  this.style.backgroundColor = "transparent";
});
  element.addEventListener("mouseover", function(){
  this.style.backgroundColor = BG_COLOR;
  this.style.color = "white";
});
});

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