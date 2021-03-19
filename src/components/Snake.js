import React from 'react';
import '../styles/snake.scss';
import htmlIcon from '../media/logo-html2.png';
import cssIcon from '../media/logo-css2.png';
import jsIcon from '../media/logo-javascript2.png';
import tsIcon from '../media/logo-typescript2.png';

import dead from '../audio/dead.mp3';
import eat from '../audio/eat.mp3';
import up from '../audio/up.mp3';
import right from '../audio/right.mp3';
import down from '../audio/down.mp3';
import left from '../audio/left.mp3';

const ICONS = [htmlIcon, cssIcon, jsIcon, tsIcon];

class Snake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: React.createRef(),
      width: 0,
      height: 0,
      context: null,
      box: 5,
      key: null,
      pause: false,
      snake: [
        {
          x: 100 / 2,
          y: 100 / 2,
        },
      ],
      obstacles: [],
      score: 0,
      food: {},
      animation: null,
      skills: [],
      audio: {},
    };
  }

  componentDidMount() {
    if (this.state.canvas) {
      this.setState(
        {
          context: this.state.canvas.current.getContext('2d'),
          width: this.state.canvas.current.offsetWidth,
          height: this.state.canvas.current.offsetHeight,
          box: Math.floor(window.innerHeight / 25),
        },
        () => {
          this.resizeCanvas();
          this.preapareIcons();
          this.preapareAudio();
          this.generateObstacles();
          this.start();
        }
      );
    }

    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('keydown', this.preventDefaultKeys);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas);
    window.removeEventListener('keydown', this.preventDefaultKeys);
  }

  preapareIcons() {
    this.setState(
      {
        skills: [
          ...ICONS.map(icon => {
            let newImage = new Image();
            newImage.src = icon;
            return newImage;
          }),
        ],
      },
      () => {
        this.newFood();
      }
    );
  }

  preapareAudio() {
    this.setState({
      audio: {
        dead: new Audio(dead),
        eat: new Audio(eat),
        up: new Audio(up),
        right: new Audio(right),
        down: new Audio(down),
        left: new Audio(left),
      },
    });
  }

  resizeCanvas = () => {
    if (this.state.canvas.current) {
      this.setState(
        {
          box: Math.floor(window.innerHeight / 25),
          width: this.state.canvas.current.offsetWidth,
          height: this.state.canvas.current.offsetHeight,
        },
        () => {
          this.generateObstacles();
        }
      );
    }
  };

  preventDefaultKeys = event => {
    if ([37, 38, 39, 40, 65, 87, 68, 83, 80].indexOf(event.keyCode) > -1) {
      event.preventDefault();
      this.pauseGame(event);
      this.direction(event);
    }
  };

  pauseGame = event => {
    if (event.keyCode === 80) {
      this.setState(prevState => ({
        pause: !prevState.pause,
      }));
    }
  };

  direction = event => {
    const { pause, key, audio } = this.state;
    console.log(audio);
    if (!pause) {
      if ((event.keyCode === 65 || event.keyCode === 37) && key !== 'RIGHT') {
        this.setState({
          key: 'LEFT',
        });
        audio['left'].play();
      } else if (
        (event.keyCode === 87 || event.keyCode === 38) &&
        key !== 'DOWN'
      ) {
        this.setState({
          key: 'UP',
        });
        audio['up'].play();
      } else if (
        (event.keyCode === 68 || event.keyCode === 39) &&
        key !== 'LEFT'
      ) {
        this.setState({
          key: 'RIGHT',
        });
        audio['right'].play();
      } else if (
        (event.keyCode === 83 || event.keyCode === 40) &&
        key !== 'UP'
      ) {
        this.setState({
          key: 'DOWN',
        });
        audio['down'].play();
      }
    }
  };

  generateObstacles = () => {
    const { width, height, snake, box } = this.state;
    const newObstacles = [];
    let newObstacle;
    for (let i = 0; i < 8; ++i) {
      do {
        newObstacle = {
          x: Math.floor(Math.random() * (width - box - box) + box),
          y: Math.floor(Math.random() * (height - box - box) + box),
        };
      } while (
        this.isCollision({ x: newObstacle.x, y: newObstacle.y }, snake) ||
        this.isCollision({ x: newObstacle.x, y: newObstacle.y }, newObstacles)
      );
      newObstacles[i] = newObstacle;
    }
    this.setState({
      obstacles: newObstacles,
    });
  };

  isCollision = (object, array) => {
    const { box } = this.state;
    for (let i = 0; i < array.length; i++) {
      if (
        object.x < array[i].x + box &&
        object.x + box > array[i].x &&
        object.y < array[i].y + box &&
        object.y + box > array[i].y
      )
        return true;
    }
    return false;
  };

  newFood = () => {
    const { skills, snake, obstacles, width, height, box } = this.state;
    let newFood;

    console.log(skills);
    do {
      newFood = {
        x: Math.floor(Math.random() * (width - box - box) + box),
        y: Math.floor(Math.random() * (height - box - box) + box),
        image:
          skills[Math.floor((Math.random() * skills.length) % skills.length)],
      };
    } while (
      this.isCollision(newFood, snake) ||
      this.isCollision(newFood, obstacles)
    );

    this.setState({
      food: newFood,
    });
  };

  draw = () => {
    const {
      pause,
      context,
      snake,
      box,
      obstacles,
      food,
      width,
      height,
      key,
      score,
      skills,
      audio,
    } = this.state;
    if (!pause) {
      context.clearRect(0, 0, width, height);
      //draw ground
      context.beginPath();
      context.fillStyle = '#5c5c5c';
      context.fillRect(0, 0, width, height);
      context.stroke();

      //draw snake
      for (let i = 0; i < snake.length; i++) {
        context.beginPath();
        context.arc(
          snake[i].x + box / 2,
          snake[i].y + box / 2,
          box / 2,
          0,
          2 * Math.PI,
          false
        );
        context.fillStyle = '#fcf1e5';
        context.strokeStyle = '#fff';
        context.lineWidth = 2;
        context.stroke();
        context.fill();
        if (i !== 0) {
          context.beginPath();
          context.fillStyle = '#f4a142';
          context.strokeStyle = '#c17f34';
          context.arc(
            snake[i].x + box / 2,
            snake[i].y + box / 2,
            box / 2,
            0,
            2 * Math.PI,
            false
          );
          context.fill();
          context.lineWidth = 2;
          context.stroke();
        }
      }

      //draw obstacels
      for (let i = 0; i < obstacles.length; ++i) {
        context.fillStyle = '#282828';
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);

        context.lineWidth = 2;
        context.strokeStyle = '#c56913';
        context.strokeRect(obstacles[i].x, obstacles[i].y, box, box);
      }

      // draw food
      if (skills.length > 0) {
        context.drawImage(food.image, food.x, food.y, box, box);
      }

      // head position
      let head = {
        x: snake[0].x,
        y: snake[0].y,
      };

      //eat the food
      if (
        head.x < food.x + box &&
        head.x + box > food.x &&
        head.y < food.y + box &&
        head.y + box > food.y
      ) {
        this.setState(prevState => ({
          score: prevState.score + 1,
        }));
        // this.changeSkills(this.food.src);
        let index = skills.indexOf(food.image);
        skills.splice(index, 1);
        if (skills.length > 0) this.newFood();
        else {
          this.setState({
            pause: true,
          });
          // endGame();
        }
        audio['eat'].play();
      } else {
        //remove
        snake.pop();
      }

      //direction
      if (key === 'LEFT') {
        head.x -= box / 4;
      }
      if (key === 'RIGHT') {
        head.x += box / 4;
      }
      if (key === 'UP') {
        head.y -= box / 4;
      }
      if (key === 'DOWN') {
        head.y += box / 4;
      }

      //edges
      if (head.x < 0) head.x = width - box;
      if (head.x + box > width) head.x = 0;
      if (head.y < 0) head.y = height - box;
      if (head.y + box > height) head.y = 0;

      //game over
      if (this.isCollision(head, obstacles)) {
        this.setState({
          pause: true,
        });
        audio['dead'].play();
        // repeatGame();
      }

      snake.unshift(head);

      //score
      context.fillStyle = 'orange';
      context.font = '45px Changa one';
      context.fillText(score, 1 * box, 1.2 * box);

      setTimeout(() => {
        window.requestAnimationFrame(this.draw);
      }, 30);
    }
  };

  start = () => {
    window.requestAnimationFrame(this.draw);
  };

  render() {
    return (
      <canvas
        ref={this.state.canvas}
        width={this.state.width}
        height={this.state.height}
        className="snake-game"
      />
    );
  }
}

export default Snake;
