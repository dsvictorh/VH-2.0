var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ContactPage Model
 * ==========
 */

var ContactPage = new keystone.List('ContactPage', { 
	sortable: true,
	map: { name: 'title' }
});

ContactPage.add({
	title: { type: Types.Text, initial: true, max: 15, required: true },
	titleFirstParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	titleImage: { type: Types.Url, initial: true, required: true, default: '/img/contact/mail.png' },
	heroBackground:  { type: Types.Url, initial: true, required: true, default: '/img/contact/contact-hero.jpg' },
});


/**
 * Registration
 */

ContactPage.defaultColumns = 'title, titleFirstParagraph, titleImage, heroImage';
ContactPage.register();
