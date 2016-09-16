var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * GamersPage Model
 * ==========
 */

var GamersPage = new keystone.List('GamersPage', { 
	sortable: true,
	map: { name: 'title' }
});

GamersPage.add({
	title: { type: Types.Text, initial: true, max: 15, required: true },
	titleFirstParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	heroBackground:  { type: Types.Url, initial: true, required: true, default: '/img/gamers/gamers-hero.jpg' },
	storiesAwesomeIcon:  { type: Types.Text, initial: true, max: 15, required: true },
	careerTitle: { type: Types.Text, initial: true, max: 15, required: true },
	careerAwesomeIcon:  { type: Types.Text, initial: true, max: 15, required: true },
	careerText: { type: Types.Html, initial: true, required: true },
	socialTitle: { type: Types.Text, initial: true, max: 15, required: true },
	socialAwesomeIcon:  { type: Types.Text, initial: true, max: 15, required: true },
	socialText: { type: Types.Html, initial: true, required: true },
	growingTitle: { type: Types.Text, initial: true, max: 15, required: true },
	growingAwesomeIcon:  { type: Types.Text, initial: true, max: 15, required: true },
	growingText: { type: Types.Html, initial: true, required: true },
	gamingTitle: { type: Types.Text, initial: true, max: 15, required: true },
	gamingAwesomeIcon:  { type: Types.Text, initial: true, max: 15, required: true },
	gamingText: { type: Types.Html, initial: true, required: true },
	spaceShooterCallout: { type: Types.Text, initial: true, max: 15, required: true },
});


/**
 * Registration
 */

GamersPage.defaultColumns = 'title, titleFirstParagraph, titleImage, heroBackground';
GamersPage.register();
