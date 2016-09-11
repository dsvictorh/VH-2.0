var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Question Model
 * ==========
 */

var Question = new keystone.List('Question', { 
	map: { name: 'question'},
	sortable: true,
});

Question.add({
	question: { type: Types.Text, initial: true, max: 15, required: true },
	answers: { type: Types.TextArray, default: [] },
	rightAnswer: { type: Types.Number, initial: true, max: 150, required: true },
	rightAnswerResponse: { type: Types.Textarea, initial: true, required: true },
});


/**
 * Registration
 */

Question.defaultColumns = 'question, rightAnswer, rightAnswerResponse';
Question.register();
