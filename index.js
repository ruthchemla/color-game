// Import stylesheets
import './style.scss';
var redDisplay = document.querySelector("#red");
var greenDisplay = document.querySelector("#green");
var blueDisplay = document.querySelector("#blue");

function startGame(){
   var num = easyGame ? 3 : 6;
   var colors = getRandomColors(num);
   for(var i = 0; i < num; i++){
        var color = colors[i];
        squeresList[i].style.backgroundColor = rgbToHex(color.red, color.green, color.blue);
   }
  //select the right guess
  var index = Math.floor(Math.random() * (+num - 1)); 
  //set the header RGB display textContent
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
  
function getRandomColors(num){
    var colors = [];
    for(var i = 0; i < num; i++){
      var random_red=Math.floor(Math.random() * (+255 - 0)) + 0; 
      var random_green=Math.floor(Math.random() * (+255 - 0)) + 0; 
      var random_blue=Math.floor(Math.random() * (+255 - 0)) + 0; 
      var rgb = {
        red:random_red,
        green:random_green,
        blue:random_blue
      }
      colors.push(rgb);
    } 
    return colors;
}   
var easyGame = false;
var isGameOver = false;
var easyButton = document.querySelector(".easy");
var hardButton = document.querySelector(".hard");
var squeresList = document.querySelectorAll("li.squere");

easyButton.addEventListener("mouseover", function(){
  this.style.color = "blue";
});
easyButton.addEventListener("mouseout", function(){
  this.style.color = "black";
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
  this.style.color = "blue";
});
hardButton.addEventListener("mouseout", function(){
  this.style.color = "black";
});
hardButton.addEventListener("click", function(){
  easyGame = false;
  isGameOver = false;
  for(var i = 0; i < squeresList.length; i++){
    squeresList[i].style.visibility = "visible"
  }
  startGame();
});

squeresList.forEach(function(element){
    element.addEventListener("click", function(){
        if(!isGameOver){
          console.log("clicked!!! "+ element.style.backgroundColor);
          var bkgColor = element.style.backgroundColor;
          var color = element.style.backgroundColor.slice(4,bkgColor.indexOf(')')).split(', ');
          if(isRightClick(color)){
            isGameOver = true;
            squeresList.forEach(function(squere){
              squere.style.backgroundColor = bkgColor;
            });
          }
          else{
            element.style.backgroundColor =  "#232323";
          }
        }
    });
});

startGame();