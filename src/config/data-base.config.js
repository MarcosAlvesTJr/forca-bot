const mongoose = require('mongoose');

const connection = () => {
	mongoose.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'words-discord'
	});

	mongoose.connection.on('error', err =>
		console.log('Não conectado ao banco. Erro:' + err)
	);

	mongoose.connection.once('open', () => console.log('Conectado ao banco.'));
};

module.exports = {
	connection
};
