var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sample Model
 * ==========
 */

var Sample = new keystone.List('Sample', {
	 map: { name: 'project' },
	 sortable: true
});

Sample.add({
	project: { type: Types.Text, initial: true, required: true },
	url: { type: Types.Url, initial: true, required: true},
	image: { type: Types.Url, initial: true, required: true, default: '/img/work/samples/vh.png' },
});


/**
 * Registration
 */

Sample.defaultColumns = 'project, url, image';
Sample.register();
