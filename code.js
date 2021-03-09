let compSequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');


function activateTile(color){
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        title.classList.remove('activated');
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

    const nextCompSequence = [...compSequence];
    nextCompSequence.push(nextStep());
    playRound(nextCompSequence);
};

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = "I'll start first! hope you can remember."
    nextRound();
};

startButton.addEventListener('click', startGame);