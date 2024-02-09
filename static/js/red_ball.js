// Importing the needed libraries
// Note: There is no direct equivalent of Pygame in JavaScript. However, you can use HTML5 canvas to achieve similar results.
// The following code assumes that you have an HTML5 canvas element with the id 'gameCanvas'.

// Setting up the canvas and context
const canvas = document.getElementById('game1');
const ctx = canvas.getContext('2d');

// Setting up the game variables
const width = 800;
const height = 800;
canvas.width = width;
canvas.height = height;
let score = 0;
const black = 'rgb(0, 0, 0)';
const white = 'rgb(255, 255, 255)';
const red = 'rgb(255, 0, 0)';
const green = 'rgb(0, 255, 0)';
const blue = 'rgb(0, 0, 255)';
let player_x = width / 2;
let player_y = height / 2;
const player_width = 50;
const player_height = 50;
const ball_radius = 20;
const ball_speed = 0.3;
const cr = [red, green, blue];
let balls = [];

// Setting up the font
const font = "36px Arial";

// Setting up the game loop
function gameLoop() {
    // Event handling is done differently in JavaScript, typically using event listeners
    // For this example, we'll assume that the key state is being tracked elsewhere

    // Randomly add new balls
    if (Math.random() < 0.05) {
        const ball_x = Math.floor(Math.random() * (width - ball_radius * 2));
        const ball_y = 0;
        balls.push({ x: ball_x, y: ball_y });
    }

    // Update ball positions
    for (let i = 0; i < balls.length; ) {
        let ball = balls[i];
        ball.y += ball_speed;

        // Collision detection
        if (player_x < ball.x + ball_radius && player_x + player_width > ball.x - ball_radius &&
            player_y < ball.y + ball_radius && player_y + player_height > ball.y - ball_radius) {
            balls.splice(i, 1);
            score += 1;
        } else {
            i++;
        }
    }

    // Drawing the game
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = white;
    ctx.fillRect(player_x, player_y, player_width, player_height);
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x + ball_radius, ball.y + ball_radius, ball_radius, 0, Math.PI * 2);
        ctx.fillStyle = red;
        ctx.fill();
    });
    ctx.fillStyle = green;
    ctx.font = font;
    ctx.fillText(`Счет ${score}`, 20, 50);

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Handling keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player_x > 0) {
        player_x -= 20;
    }
    if (event.key === 'ArrowRight' && player_x < width - player_width) {
        player_x += 20;
    }
});
