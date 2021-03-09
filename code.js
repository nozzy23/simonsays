let compSequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
    alert(text);
    compSequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Simon Says';
    tileContainer.classList.add('unclickable');
}

function humanTurn(level) {
    tileContainer.classList.remove('unclickable');
    info.textContent = `Your Turn: ${level} Tap${level > 1 ? 's' : ''}`;
}


function activateTile(color){
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextCompSequence) {
    nextCompSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function nextStep() {
    const titles = ['red', 'green', 'blue', 'yellow'];
    const random = titles[Math.floor(Math.random() * titles.length)];

    return random;
}

function nextRound() {
    level += 1;

    tileContainer.classList.add('unclickable');
    info.textContent = 'Wait for computer';
    heading.textContent = `Level ${level} of 20`;

    const nextCompSequence = [...compSequence];
    nextCompSequence.push(nextStep());
    playRound(nextCompSequence);

    compSequence = [... nextCompSequence];
    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);
}

function handleClick(tile){
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = compSequence.length - humanSequence.length;

    if(humanSequence[index] != compSequence[index]){
        resetGame("Game Over, wrong tile was pressed");
        return;
    }



    if(humanSequence.length === compSequence.length) {

        if (humanSequence.length === 20){
            resetGame("you won!");
            return
        }

        humanSequence = [];
        info.textContent = 'Success! Keep Going';
        setTimeout(() => {
            nextRound();
        }, 1000);
        return
    }
    info.textContent = `Your Turn ${remainingTaps} Tap ${remainingTaps > 1 ? 's' : ''}`;
}

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = "I'll start first! hope you can remember."
    nextRound();
};

startButton.addEventListener('click', startGame);

tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
    
    if (tile) handleClick(tile);
});