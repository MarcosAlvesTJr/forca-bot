const mongoose = require('mongoose');

const WordsSchema = new mongoose.Schema({
	words: Array
});

let Word = mongoose.model('Word', WordsSchema, 'words');

const getOne = async () => {
	const { words } = await Word.findOne({});
	return words[Math.floor(Math.random() * words.length)];
};

module.exports = {
	getOne
};
