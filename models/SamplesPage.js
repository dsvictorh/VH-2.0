var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SamplesPage Model
 * ==========
 */

var SamplesPage = new keystone.List('SamplesPage', { 
	sortable: true,
	map: { name: 'title' }
});

SamplesPage.add({
	title: { type: Types.Text, initial: true, max: 15, required: true },
	titleFirstParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	titleSecondParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	titleImage: { type: Types.Url, initial: true, required: true, default: '/img/samples/uh-oh.png' },
	heroBackground:  { type: Types.Url, initial: true, required: true, default: '/img/samples/samples-hero.jpg' },
});


/**
 * Registration
 */

SamplesPage.defaultColumns = 'title, titleFirstParagraph, titleSecondParagraph, titleImage, heroImage';
SamplesPage.register();
