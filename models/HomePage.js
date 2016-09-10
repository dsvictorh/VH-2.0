var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * HomePage Model
 * ==========
 */

var HomePage = new keystone.List('HomePage', { 
	sortable: true,
	map: { name: 'title' }
});

HomePage.add({
	title: { type: Types.Text, initial: true, max: 15, required: true },
	titleFirstParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	titleSecondParagraph: { type: Types.Textarea, initial: true, max: 150, required: true },
	titleImage: { type: Types.Url, initial: true, required: true, default: '/img/about-me/vh.png' },
	heroBackground:  { type: Types.Url, initial: true, required: true, default: '/img/about-me/intro-hero.jpg' },
	hiddenVHImage: { type: Types.Url, initial: true, required: true, default: '/img/about-me/hidden-victor.png' } 
});


/**
 * Registration
 */

HomePage.defaultColumns = 'title, titleFirstParagraph, titleSecondParagraph, titleImage, heroImage';
HomePage.register();
