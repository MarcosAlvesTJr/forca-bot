const isStarting = cmd => cmd.content === '!comecar';

const isAValidAttempt = cmd => cmd.content.includes('!tentar');

const isOnlyOneLetter = cmd => cmd.content.length === 9;

module.exports = {
    isStarting,
    isAValidAttempt,
    isOnlyOneLetter,
}