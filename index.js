// Import stylesheets
import './style.scss';
var redDisplay = document.querySelector("#red");
var greenDisplay = document.querySelector("#green");
var blueDisplay = document.querySelector("#blue");
var easyGame = false;
var headerBackgroundColor = "#4e82b4";
var isGameOver = false;
var easyButton = document.querySelector(".easy");
var hardButton = document.querySelector(".hard");
var newColors = document.querySelector(".new-game");
var squeresList = document.querySelectorAll("li.squere");

function startGame(){
  isGameOver = false;
    document.querySelector("header").style.backgroundColor = headerBackgroundColor;
   var num = easyGame ? 3 : 6;
   var colors = getRandomColors(num);
   for(var i = 0; i < num; i++){
        var color = colors[i];
        squeresList[i].style.backgroundColor = rgbToHex(color.red, color.green, color.blue);
   }
  //select the right guess
  var index = Math.floor(Math.random() * (+num - 1)); 
  //set the header RGB display
  redDisplay.textContent = colors[index].red;
  greenDisplay.textContent = colors[index].green;
  blueDisplay.textContent = colors[index].blue;
}
function isRightClick(rgb){
  console.log("isRightClick(rgb) "+ rgb);
  console.log(rgb[0]+" == "+redDisplay.textContent);
  console.log(rgb[1] +" == "+greenDisplay.textContent);
  console.log(rgb[2] +" == "+blueDisplay.textContent);
  return (rgb[0] == redDisplay.textContent && rgb[1] == greenDisplay.textContent && rgb[2] == blueDisplay.textContent);
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
newColors.addEventListener("mouseover", function(){
  this.style.color = "white";
  this.style.backgroundColor = headerBackgroundColor;
});
newColors.addEventListener("mouseout", function(){
  this.style.color = "black";
  this.style.backgroundColor = "transparent";
});
newColors.addEventListener("click", function(){
  this.textContent = "NEW COLORS";
  startGame();
});
easyButton.addEventListener("mouseover", function(){
  this.style.backgroundColor = headerBackgroundColor;
  this.style.color = "white";
});
easyButton.addEventListener("mouseout", function(){
  this.style.color = "black";
  this.style.backgroundColor = "transparent";
});
easyButton.addEventListener("click", function(){
  easyGame = true;
  isGameOver = false;
  for(var i = 3; i < squeresList.length; i++){
    squeresList[i].style.visibility = "hidden"
  }
  startGame();
});
hardButton.addEventListener("mouseover", function(){
  this.style.backgroundColor = headerBackgroundColor;
  this.style.color = "white";});
hardButton.addEventListener("mouseout", function(){
  this.style.color = "black";
  this.style.backgroundColor = "transparent";
});
hardButton.addEventListener("click", function(){
  easyGame = false;
  isGameOver = false;
  for(var i = 0; i < squeresList.length; i++){
    squeresList[i].style.visibility = "visible"
  }
  startGame();
});
function onSquareClick(element){
  console.log("clicked!!! "+ element.style.backgroundColor);
  var bkgColor = element.style.backgroundColor;
  var color = element.style.backgroundColor.slice(4,bkgColor.indexOf(')')).split(', ');
  if(isRightClick(color)){
    isGameOver = true;
    newColors.textContent = "PLAY AGAIN?";
    document.querySelector("header").style.backgroundColor = bkgColor;
    squeresList.forEach(function(squere){
        squere.style.backgroundColor = bkgColor;
      });
    }
  else{
    element.style.backgroundColor =  "#232323";
  }
}
squeresList.forEach(function(element){
    element.addEventListener("click", function(){
      if(!isGameOver){
        onSquareClick(element);
      }
    });
});
startGame();