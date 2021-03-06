let compSequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');

function nextStep() {
    const titles = ['red', 'green', 'blue', 'yellow'];
    const random = titles[Math.floor(Math.random() * titles.length)];

    return random;
};

function nextRound() {
    level += 1;

    const nextCompSequence = [...compSequence];
    nextCompSequence.push(nextStep());
};

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = "I'll start first! hope you can remember."
};

startButton.addEventListener('click', startGame);