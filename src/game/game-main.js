const models = require('./game-models');
const accentuation = require('../utils/remove-accentuation');
const wordApi = require('../word/word-main');

let attempts = 6;
let word = '';
let hiddenWord = '';
let start = false;

const startGame = () => (start = !start);

const gameHasStarted = () => start;

const fillWord = async () => {
	word = await wordApi.getOne();
};

const showWord = () => word;

const createHiddenWord = () => {
	hiddenWord = word.split('').map(_ => '*');
};

const getLetter = cmd => cmd.content.split(' ', 2)[1];

const attemptFail = () => attempts--;

const returnCurrentModelState = () => models.mapModels.get(attempts);

const generateHint = matches => {
	hiddenWord.forEach((char, charIndex) => {
		matches.forEach(match => {
			if (match.index === charIndex) {
				hiddenWord.splice(match.index, 1, match.letter);
			}
		});
	});

	return hiddenWord.join(' ');
};

const checkIfPlayerAttemptHasAnyMatches = char => {
	const matches = word
		.split('')
		.map((letter, index) => {
			if (accentuation.remove(letter) === char.toLowerCase()) {
				return { letter, index };
			}
		})
		.filter(match => match !== undefined);

	return matches;
};

const playerWin = () => {
	return hiddenWord.join('').includes(word);
};

const playerLost = () => attempts === 0;

const resetGame = () => {
	attempts = 6;
	hiddenWord = word.split('').map(_ => '*');
};

module.exports = {
	getLetter,
	checkIfPlayerAttemptHasAnyMatches,
	generateHint,
	attemptFail,
	returnCurrentModelState,
	playerWin,
	resetGame,
	playerLost,
	fillWord,
	createHiddenWord,
	showWord,
	startGame,
	gameHasStarted
};
