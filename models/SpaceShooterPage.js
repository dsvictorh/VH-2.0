var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SpaceShooterPage Model
 * ==========
 */

var SpaceShooterPage = new keystone.List('SpaceShooterPage', { 
	sortable: true,
	map: { name: 'title' }
});

SpaceShooterPage.add({
	title: { type: Types.Text, initial: true, max: 15, required: true },
	titleFirstParagraph: { type: Types.Html, initial: true, required: true },
	subtitle: { type: Types.Text, initial: true, max: 15, required: true },
	controlsText: { type: Types.Textarea, initial: true, max: 150, required: true }
});


/**
 * Registration
 */

SpaceShooterPage.defaultColumns = 'title, titleFirstParagraph, subtitle, controlsText';
SpaceShooterPage.register();
