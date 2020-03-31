require('dotenv').config();
const Discord = require('discord.js');
const DB = require('./src/config/data-base.config');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const commands = require('./src/game/game-commands');
const main = require('./src/game/game-main');
bot.login(TOKEN);
DB.connection();

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
	if (commands.isStarting(msg)) {
		main.startGame();
		await main.fillWord();
		main.createHiddenWord();
		msg.reply();
		msg.channel.send('Vamos começar!');
		msg.channel.send(main.returnCurrentModelState());
		msg.channel.send('Digite uma letra...');
	}

	if (commands.isAValidAttempt(msg)) {
		if (main.gameHasStarted()) {
			if (commands.isOnlyOneLetter(msg)) {
				const letter = main.getLetter(msg);
				const matches = main.checkIfPlayerAttemptHasAnyMatches(letter);

				if (matches.length > 0) {
					const hint = main.generateHint(matches);
					msg.channel.send('Acertou!');
					msg.channel.send(main.returnCurrentModelState());
					msg.channel.send(hint);

					if (main.playerWin()) {
						msg.channel.send(
							'Você ganhou! :D Digite !comecar para jogar novamente.'
						);
						main.resetGame();
					}
				} else {
					msg.channel.send('Errou! :(');
					main.attemptFail();
					msg.channel.send(main.returnCurrentModelState());

					if (main.playerLost()) {
						msg.channel.send(
							'Você perdeu! :( Digite !comecar para jogar novamente.'
						);
						msg.channel.send('A palavra era: ' + main.showWord());
						main.resetGame();
					}
				}
			} else {
				msg.channel.send('APENAS UMA LETRA! x(');
			}
		} else {
			msg.reply();
			msg.channel.send(
				'Ops, parece que você ainda não começou um jogo. Digite !comecar para começar a jogar! :D'
			);
		}
	}
});
