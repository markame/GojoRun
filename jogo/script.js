const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const restartButton = document.getElementById('restart');

let isJumping = false;
let isGameOver = false;
let score = 0;

// Função para controlar o pulo
function jump() {
    if (isJumping) return; // Se já estiver pulando, ignora

    let position = 0;
    isJumping = true;

    const jumpInterval = setInterval(() => {
        if (position >= 150) { // Altura máxima do pulo
            clearInterval(jumpInterval);

            // Gravidade (descendo)
            const fallInterval = setInterval(() => {
                if (position <= 0) { // De volta ao chão
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    player.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // Pular (subindo)
            position += 5;
            player.style.bottom = position + 'px';
        }
    }, 20);
}

// Detecta a tecla de espaço para o pulo
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Função para detectar colisão
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.left + obstacleRect.width &&
        playerRect.left + playerRect.width > obstacleRect.left &&
        playerRect.top < obstacleRect.top + obstacleRect.height &&
        playerRect.height + playerRect.top > obstacleRect.top
    ) {
        isGameOver = true;
        gameOverDisplay.style.display = 'block'; // Mostra a mensagem de Game Over
        obstacle.style.animationPlayState = 'paused'; // Para o movimento do obstáculo
        clearInterval(scoreInterval); // Para o contador de pontos
    }
}

// Função para incrementar o contador de pontos
let scoreInterval = setInterval(() => {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
}, 100);

// Função para reiniciar o jogo
restartButton.addEventListener('click', () => {
    document.location.reload();
});

// Função de loop do jogo
function gameLoop() {
    if (!isGameOver) {
        checkCollision();
        requestAnimationFrame(gameLoop);
    }
}

// Iniciar o loop do jogo
gameLoop();
