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
	titleSecondParagraph: { type: Types.Textarea, initial: true, max: 150, required: true }
});


/**
 * Registration
 */

SamplesPage.defaultColumns = 'title, titleFirstParagraph, titleSecondParagraph';
SamplesPage.register();
