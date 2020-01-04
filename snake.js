var $ = jQuery;

var ctx;
var cvs;
var game;
var p;
var skills = [];

//image

const html = new Image();
html.src = "icon-black/logo-html2.png";
html.alt = "html";
skills.push(html);

const css = new Image();
css.src = "icon-black/logo-css2.png";
css.alt = "css";
skills.push(css);

const bootstrap = new Image();
bootstrap.src = "icon-black/logo-bootstrap2.png";
bootstrap.alt = "bootstrap";
skills.push(bootstrap);

const sass = new Image();
sass.src = "icon-black/logo-sass2.png";
sass.alt = "sass";
skills.push(sass);

const jquery = new Image();
jquery.src = "icon-black/logo-jquery2.png";
jquery.alt = "jquery";
skills.push(jquery);

const javascript = new Image();
javascript.src = "icon-black/logo-javascript2.png";
javascript.alt = "javascript";
skills.push(javascript);

const php = new Image();
php.src = "icon-black/logo-php2.png";
php.alt = "php";
skills.push(php);

const reactjs = new Image();
reactjs.src = "icon-black/logo-reactjs2.png";
reactjs.alt = "reactjs";
skills.push(reactjs);

const wordpress = new Image();
wordpress.src = "icon-black/logo-wordpress2.png";
wordpress.alt = "wordpress";
skills.push(wordpress);

const git = new Image();
git.src = "icon-black/logo-git2.png";
git.alt = "git";
skills.push(git);

const sql = new Image();
sql.src = "icon-black/logo-sql2.png";
sql.alt = "sql";
skills.push(sql);

const typescript = new Image();
typescript.src = "icon-black/logo-typescript2.png";
typescript.alt = "typescript";
skills.push(typescript);

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
    window.addEventListener("resize", resizeCanvas, false);
    resizeCanvas();
  }

  function redraw() {
    ctx.fillStyle = "#5c5c5c";
    ctx.fillRect(
      0,
      0,
      $("#snake-game").width(),
      $("#skills-container").height()
    );
    ctx.stroke();
  }

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  // then draws the new borders accordingly.
  function resizeCanvas() {
    cvs.width = $("#snake-game").width();
    cvs.height = $("#skills-container").height();
    box = Math.floor($(window).height() / 15);
    redraw();
  }
})();

//startGame

function startGame() {
  $("#snake-button-container").hide();
  $(".snake-button:eq(0)").hide();
  $(".snake-button:eq(1)").hide();
  $(".snake-button:eq(3)").hide();
  p = new Game();
  $("html,body").animate({
    scrollTop: $("#snake").offset().top
  });
}

$(".snake-button:eq(0)").click(startGame);

//skip game
$(".snake-button:eq(1)").click(function() {
  $("#snake-game").hide();
  $("#snake-button-container").hide();
  skills.forEach(element => {
    let image = $("#" + element.alt);
    image.fadeOut(0, function() {
      image.attr("src", "icon-black/logo-" + element.alt + "2.png");
      image.fadeIn(2000);
    });
    image.siblings().css({ color: "#111" });
    $("#" + element.alt + "-battery .battery-green:eq(3)").css({
      "background-color": "#649655"
    });
    setTimeout(() => {
      $("#" + element.alt + "-battery .battery-green:eq(2)").css({
        "background-color": "#649655"
      });
    }, 300);
    setTimeout(() => {
      $("#" + element.alt + "-battery .battery-green:eq(1)").css({
        "background-color": "#649655"
      });
    }, 600);
    setTimeout(() => {
      $("#" + element.alt + "-battery .battery-green:eq(0)").css({
        "background-color": "#649655"
      });
    }, 900);
    $("#" + element.alt + "-battery .battery-yellow:eq(1)").css({
      "background-color": "#c1b051"
    });
    setTimeout(() => {
      $("#" + element.alt + "-battery .battery-yellow:eq(0)").css({
        "background-color": "#c1b051"
      });
    }, 500);
    $("#" + element.alt + "-battery .battery-red").css({
      "background-color": "#af6057"
    });
  });
});

//end Game
function endGame() {
  $("#snake-button-container").show();
  $(".snake-button:eq(2)").css({ display: "block" });
}

$(".snake-button:eq(2)").click(function() {
  $(".snake-button:eq(2)").hide();
  $("#snake-game").hide();
});

//repeat game

function repeatGame() {
  $("#snake-button-container").show();
  $(".snake-button:eq(1)").css({ display: "block" });
  $(".snake-button:eq(3)").css({ display: "block" });
}

$(".snake-button:eq(3)").click(startGame);

//disable defalut key function

window.addEventListener(
  "keydown",
  function(e) {
    // space and arrow keys
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

class Game {
  constructor() {
    this.key;
    this.pause = false;
    this.snake = [];
    this.obstacles = [];
    this.snake[0] = {
      x: $("#snake-game").width() / 2,
      y: $("#skills-container").height() / 2
    };
    this.score = 0;
    this.generateObstacles();
    this.newFood();
    this.newFood = this.newFood.bind(this);
    this.draw = this.draw.bind(this);
    this.isCollision=this.isCollision.bind(this);
    window.addEventListener("keydown", event => this.direction(event));
    window.addEventListener("keydown", event => this.pauseGame(event));
    window.addEventListener("resize", () => this.newFood(), false);
    this.start();
  }

  pauseGame(event) {
    if (event.keyCode == 80 && this.pause == false) {
      this.pause = !this.pause;
    } else if (event.keyCode == 80 && this.pause == true) {
      this.pause = !this.pause;
    }
  }

  //control
  direction(event) {
    if (!this.pause) {
      if ((event.keyCode == 65 || event.keyCode == 37) && this.key != "RIGHT") {
        this.key = "LEFT";
        left.play();
      } else if (
        (event.keyCode == 87 || event.keyCode == 38) &&
        this.key != "DOWN"
      ) {
        this.key = "UP";
        up.play();
      } else if (
        (event.keyCode == 68 || event.keyCode == 39) &&
        this.key != "LEFT"
      ) {
        this.key = "RIGHT";
        right.play();
      } else if (
        (event.keyCode == 83 || event.keyCode == 40) &&
        this.key != "UP"
      ) {
        this.key = "DOWN";
        down.play();
      }
    }
  }

  generateObstacles() {
    for(let i=0;i<5;++i){
      do{
        this.obstacles[i]={
          x:Math.floor(Math.random() * $("#snake-game").width()),
          y:Math.floor(Math.random() * $("#skills-container").height()),
        }
      }while(this.isCollision({x: this.obstacles[i].x, y: this.obstacles[i].y},this.snake));
    }
  }

  isCollision(object,array) {
    for (let i = 0; i < array.length; i++) {
      if (
        object.x < array[i].x + box &&
        object.x + box > array[i].x &&
        object.y < array[i].y + box &&
        object.y + box > array[i].y
      )
        return true;
      if (
        object.x > $("#snake-game").width() - box ||
        object.y > $("#skills-container").height() - box
      )  
        return true;
    }
    return false;
  }

  newFood() {
    do {
      this.food = {
        x: Math.floor(Math.random() * $("#snake-game").width()),
        y: Math.floor(Math.random() * $("#skills-container").height()),
        src: skills[Math.floor((Math.random() * skills.length) % skills.length)]
      };
    } while (this.isCollision(this.food,this.snake) || this.isCollision(this.food,this.obstacles));
  }

  changeSkills(skill) {
    let image = $("#" + skill.alt);

    if (
      $("#" + skill.alt).attr("src") !=
      "icon-black/logo-" + skill.alt + "2.png"
    ) {
      image.fadeOut(0, function() {
        image.attr("src", "icon-black/logo-" + skill.alt + "2.png");
        image.fadeIn(2000);
      });
      image.siblings().css({ color: "#111" });
      $("#" + skill.alt + "-battery .battery-green:eq(3)").css({
        "background-color": "#649655"
      });
      setTimeout(() => {
        $("#" + skill.alt + "-battery .battery-green:eq(2)").css({
          "background-color": "#649655"
        });
      }, 300);
      setTimeout(() => {
        $("#" + skill.alt + "-battery .battery-green:eq(1)").css({
          "background-color": "#649655"
        });
      }, 600);
      setTimeout(() => {
        $("#" + skill.alt + "-battery .battery-green:eq(0)").css({
          "background-color": "#649655"
        });
      }, 900);
      $("#" + skill.alt + "-battery .battery-yellow:eq(1)").css({
        "background-color": "#c1b051"
      });
      setTimeout(() => {
        $("#" + skill.alt + "-battery .battery-yellow:eq(0)").css({
          "background-color": "#c1b051"
        });
      }, 500);
      $("#" + skill.alt + "-battery .battery-red").css({
        "background-color": "#af6057"
      });
    }
  }

  draw() {
    if (!this.pause) {
      //draw ground
      ctx.beginPath();
      ctx.fillStyle = "#5c5c5c";
      ctx.fillRect(
        0,
        0,
        $("#snake-game").width(),
        $("#skills-container").height()
      );
      ctx.stroke();

      //draw snake
      for (let i = 0; i < this.snake.length; i++) {
        ctx.beginPath();
        ctx.arc(
          this.snake[i].x + box / 2,
          this.snake[i].y + box / 2,
          box / 2,
          0,
          2 * Math.PI,
          false
        );
        ctx.fillStyle = "#fcf1e5";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fill();
        if (i != 0) {
          ctx.beginPath();
          ctx.fillStyle = "#f4a142";
          ctx.strokeStyle = "#c17f34";
          ctx.arc(
            this.snake[i].x + box / 2,
            this.snake[i].y + box / 2,
            box / 2,
            0,
            2 * Math.PI,
            false
          );
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      //draw obstacels
      for(let i=0;i<this.obstacles.length;++i){
        ctx.fillStyle = "#282828";
        ctx.fillRect(this.obstacles[i].x,this.obstacles[i].y,box,box);
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#c56913';
        ctx.strokeRect(this.obstacles[i].x,this.obstacles[i].y,box,box);
      }


      //draw food
      if (skills.length > 0)
        ctx.drawImage(this.food.src, this.food.x, this.food.y, box, box);

      // head position
      let head = {
        x: this.snake[0].x,
        y: this.snake[0].y,
      };

      //eat the food
      if (
        head.x < this.food.x + box &&
        head.x + box > this.food.x &&
        head.y < this.food.y + box &&
        head.y + box > this.food.y
      ) {
        this.score++;
        this.changeSkills(this.food.src);
        let index = skills.indexOf(this.food.src);
        skills.splice(index, 1);
        if (skills.length > 0) this.newFood();
        else {
          this.pause = true;
          endGame();
        }
        eat.play();
      } else {
        //remove
        this.snake.pop();
      }

      //direction
      if (this.key == "LEFT") {
        head.x -= box / 4;
      }
      if (this.key == "RIGHT") {
        head.x += box / 4;
      }
      if (this.key == "UP") {
        head.y -= box / 4;
      }
      if (this.key == "DOWN") {
        head.y += box / 4;
      }

      //edges
      if (head.x < 0) head.x = $("#snake-game").width() - box;
      if (head.x + box > $("#snake-game").width()) head.x = 0;
      if (head.y < 0) head.y = $("#skills-container").height() - box;
      if (head.y + box > $("#skills-container").height()) head.y = 0;

      //game over
      if(this.isCollision(head,this.obstacles)){
				clearInterval(game);
				dead.play();
				repeatGame();
			}

      this.snake.unshift(head);

      //score
      ctx.fillStyle = "orange";
      ctx.font = "45px Changa one";
      ctx.fillText(this.score, 1 * box, 1.2 * box);
    }
  }

  start() {
    game = setInterval(this.draw, 50);
  }
}
