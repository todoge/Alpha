var numOfSquares = 6;
var pickedColor;
var colors;
var squares = document.querySelectorAll(".square");
var displayText = document.getElementById("display");
var h1_background = document.querySelector("h1");
var reset = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");

runGame();

function runGame(){
	generateModeButtons();
	generateNewColorSquares();
	setupSquares();
}
function setupSquares(){
//check if colors match
	for(var x = 0; x < squares.length; x++)
	{
		squares[x].addEventListener("click",function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor)
			{
				changeAllColors(pickedColor);
				msgDisplay.textContent = "Correct";
				reset.textContent = "Play Again?";
				h1_background.style.background = pickedColor;
			}
			else{this.style.backgroundColor = "#232323";
			msgDisplay.textContent = "Try Again";}
			})
	}
}
function generateModeButtons(){
//Generate buttons
for (var i = 0; i < mode.length; i++)
{
	mode[i].addEventListener("click", function(){
	mode[0].classList.remove("btnBackground");
	mode[1].classList.remove("btnBackground");
	mode[2].classList.remove("btnBackground");
	this.classList.add("btnBackground");
	if(this.textContent === "Easy")
	{numOfSquares = 3;}
	else if (this.textContent === "Medium")
	{numOfSquares = 6;}
	else{numOfSquares = 9;}
	generateNewColorSquares();
	})
}
}
//change all squares to a particular color
function changeAllColors(color){
for(var i = 0; i < squares.length; i++)
	squares[i].style.backgroundColor = color;
}
//loops the randomColor function and returns an array of random rgb colors
function generateRandomColorsArray(num)
{
	var tempArray = [];
	for(var i = 0; i < num; i++)
	{
		tempArray.push(randomColor());
	}
	return tempArray;
}
//create a random color
function randomColor(){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb("+ r + ", " + g + ", " + b + ")";
}

function generateNewColorSquares(){
	h1_background.style.background = "steelblue";
	//change text on reset button
	reset.textContent = "New color";
	msgDisplay.textContent = "";
	//generate new colors array
	colors = generateRandomColorsArray(numOfSquares);
	// display new pickedColor
	pickedColor = colors[Math.floor(Math.random() * numOfSquares)];
	displayText.textContent = pickedColor;
	//display new colors on to squares
	for(var x = 0; x < squares.length; x++)
	if (colors[x])
	{
		squares[x].style.display = "block";
		{squares[x].style.backgroundColor = colors[x];}
	}
	else{squares[x].style.display = "none"}
	}
//reset button
reset.addEventListener("click", function(){
	generateNewColorSquares();
	})