const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const startGameButton = document.getElementById("startGame");

let snake = [{x: 150, y: 150}];
let dx = 10;
let dy = 0;
let foodX, foodY;
let score = 0;
let gameSpeed = 100;
let gameInterval;

canvas.width = 300;
canvas.height = 300;

function startGame() {
    clearInterval(gameInterval);
    snake = [{x: 150, y: 150}];
    dx = 10;
    dy = 0;
    score = 0;
    scoreElement.innerText = score;
    createFood();
    gameInterval = setInterval(main, gameSpeed);
}

function main() {
    if (didGameEnd()) {
        clearInterval(gameInterval);
        return;
    }
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(snakePart => {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    });
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreElement.innerText = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, 10, 10);
}

function createFood() {
    foodX = Math.round((Math.random() * (canvas.width - 10)) / 10) * 10;
    foodY = Math.round((Math.random() * (canvas.height - 10)) / 10) * 10;
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function changeDirection(event) {
    const keyPressed = event.keyCode;

    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

document.addEventListener("keydown", changeDirection);
startGameButton.addEventListener("click", startGame);
