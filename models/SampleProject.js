var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SampleProject Model
 * ==========
 */

var SampleProject = new keystone.List('SampleProject', 
	{ 
		sortable: true
	}
);

SampleProject.add({
	name: { type: Types.Text, initial: true, required: true },
	description: { type: Types.Html, initial: true, required: true },
	image: { type: Types.Url, initial: true, required: true},
	git: { type: Types.Url, initial: true, required: true},
	url: { type: Types.Url, initial: true},
});


/**
 * Registration
 */

SampleProject.defaultColumns = 'name, description, image';
SampleProject.register();
