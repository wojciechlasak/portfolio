var $=jQuery;

var ctx;
var cvs;
var game;
var p;
var skills = [];

//image

const cpp = new Image();
cpp.src = "img-skills/c++.png";
skills.push(cpp);

const java = new Image();
java.src = "img-skills/java.png";
skills.push(java);

const html = new Image();
html.src = "img-skills/html.png";
skills.push(html);

const es6 = new Image();
es6.src = "img-skills/es6.png";
skills.push(es6);

const css = new Image();
css.src = "img-skills/css.png";
skills.push(css);

const jQuary = new Image();
jQuary.src = "img-skills/jQuary.png";
skills.push(jQuary);

const js = new Image();
js.src = "img-skills/js.png";
skills.push(js);

const php = new Image();
php.src = "img-skills/php.png";
skills.push(php);

const react = new Image();
react.src = "img-skills/react.png";
skills.push(react);

const wordpress = new Image();
wordpress.src = "img-skills/wordpress.png";
skills.push(wordpress);

const reactnative = new Image();
reactnative.src = "img-skills/reactnative.png";
skills.push(reactnative);

//audio

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//resizing canvas

(function() {
	cvs = document.getElementById("snake-game");
	
	ctx = cvs.getContext("2d");


	// Start listening to resize events and
	// draw canvas.
	initialize();

	function initialize() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}
					
	function redraw() {
		ctx.fillStyle = '#5c5c5c';
		ctx.fillRect(0,0,$("#snake-game").width(),$("#skills-container").height());
		ctx.stroke();
	}

	// Runs each time the DOM window resize event fires.
	// Resets the canvas dimensions to match window,
	// then draws the new borders accordingly.
	function resizeCanvas() {
		cvs.width = $("#snake-game").width();
		cvs.height = $("#skills-container").height();
		box = Math.floor($(window).height()/10);
		console.log(box);
		redraw();
	}

})();

//startGame

$("#snake-button").click(function(){
	$("#snake-button").hide();
	p=new Game();
});

//disable defalut key function

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

class Game{
	constructor(){
		this.key;
		this.pause=false;
		this.snake=[];
		this.snake[0]={
			x: $("#snake-game").width()/2,
			y: $("#skills-container").height()/2
		}
		this.food = {
			x:Math.floor(Math.random()*$("#snake-game").width()),
			y:Math.floor(Math.random()*$("#skills-container").height()),
			src:skills[0],
		};
		this.score=0;
		this.newFood=this.newFood.bind(this);
		this.check=this.check.bind(this);
		this.draw=this.draw.bind(this);
		//this.collision=this.collision.bind(this);
		window.addEventListener('keydown', event => this.direction(event));
		window.addEventListener('keydown', event => this.pauseGame(event));
		window.addEventListener('resize', () => this.newFood(), false);
		this.start();
	}

	pauseGame(event){
		if((event.keyCode == 80)&& this.pause==false){
			this.pause=!this.pause;
		}else if((event.keyCode == 80)&& this.pause==true){
			this.pause=!this.pause;
		}		
		
	}

	//control
	direction(event){
		if(!this.pause){
			if((event.keyCode == 65 || event.keyCode==37)&& this.key != "RIGHT"){
				this.key = "LEFT";
				left.play();
			}else if((event.keyCode == 87 || event.keyCode==38)&& this.key != "DOWN"){
				this.key = "UP";
				up.play();
			}else if((event.keyCode == 68 || event.keyCode==39)&& this.key != "LEFT"){	
				this.key = "RIGHT";
				right.play();
			}else if((event.keyCode == 83 || event.keyCode==40)&& this.key != "UP"){
				this.key = "DOWN";
				down.play();
			}else if((event.keyCode == 68 || event.keyCode==39)&& this.key != "LEFT"){
				this.key = "RIGHT";
				right.play();
			}else if((event.keyCode == 65 || event.keyCode==37)&& this.key != "RIGHT"){
				this.key = "LEFT";
				left.play();
			}
		}
	}
	
	//food
	newFood(){
		do{
			this.food = {
				x:Math.floor(Math.random()*$("#snake-game").width()),
				y:Math.floor(Math.random()*$("#skills-container").height()),
				src:skills[Math.floor(Math.random()*10%10)],
			};
		}while(this.check(this.food.x,this.food.y));
	}
	//collision

	/*collision(head,array){
		for(let i=0;i<array.length;i++){
			if(head.x == array[i].x && head.y == array[i].y){
				return true;
			}
		}
		return false;
	}*/

	//check

	check(a,b){
		let flag=false;
		for(let i=0;i<this.snake.length;i++){
			if(a < this.snake[i].x+box && a+box > this.snake[i].x &&
				b < this.snake[i].y+box && b+box > this.snake[i].y) flag=true;
			if(a > $("#snake-game").width()-box ||
				b > $("#skills-container").height()-box) flag=true;
		}
		
		return flag;
	}
	//draw

	draw(){
		
		if(!this.pause){

			//draw ground
			ctx.beginPath();
			ctx.fillStyle = '#5c5c5c';
			ctx.fillRect(0,0,$("#snake-game").width(),$("#skills-container").height());
			ctx.stroke();

			//draw snake
			for(let i=0;i<this.snake.length;i++){
				ctx.beginPath();
				ctx.arc(this.snake[i].x+box/2, this.snake[i].y+box/2, box/2, 0, 2 * Math.PI, false);
				ctx.fillStyle = '#fcf1e5';
				ctx.strokeStyle = '#fff';
				ctx.lineWidth = 2;
				ctx.stroke();
				ctx.fill();
				if(i!=0){
					ctx.beginPath();
					ctx.fillStyle = '#f4a142';
					ctx.strokeStyle = '#c17f34';
					ctx.arc(this.snake[i].x+box/2, this.snake[i].y+box/2, box/2, 0, 2 * Math.PI, false);
					ctx.fill();
					ctx.lineWidth = 2;
					ctx.stroke();
				}
			}

			//draw food
			ctx.drawImage(this.food.src, this.food.x, this.food.y,box,box);
			/*ctx.beginPath();
			ctx.fillStyle = '#000';
			ctx.fillRect(this.food.x,this.food.y,box,box);
			ctx.stroke();*/

					
			//old head position
			let snakeX = this.snake[0].x;
			let snakeY = this.snake[0].y;
			
			//eat the food
			if (snakeX < this.food.x+box && snakeX+box > this.food.x &&
				snakeY < this.food.y+box && snakeY+box > this.food.y){ 
				this.score++;
				this.newFood();
				eat.play();
			}else{
				//remove
				this.snake.pop();
			}
			
			//direction
			if(this.key=="LEFT") {snakeX -=box/4;}
			if(this.key=="RIGHT") {snakeX +=box/4;}
			if(this.key=="UP") {snakeY -=box/4;}
			if(this.key=="DOWN"){ snakeY +=box/4;}

			//add new Head
			
			let newHead = {
				x : snakeX,
				y : snakeY
			}

			//edges
			if(newHead.x<0) newHead.x=$("#snake-game").width()-box;
			if(newHead.x+box > $("#snake-game").width()) newHead.x=0;
			if(newHead.y < 0) newHead.y=$("#skills-container").height()-box;
			if(newHead.y+box>$("#skills-container").height())newHead.y=0

			//game over
			/*if( this.collision(newHead,this.snake)){
				clearInterval(game);
				dead.play();
				ctx.fillStyle = "orange";
				ctx.font="45px Changa one";
				ctx.fillText("Spróbuj jeszcze raz - F5",4.2*box,5*box);
			}*/
			
			this.snake.unshift(newHead);
			
			
			//score
			ctx.fillStyle = "orange";
			ctx.font="45px Changa one";
			ctx.fillText(this.score,1*box,1.2*box);

		}
	}

	start(){
		game=setInterval(this.draw,40);
	}
	
}