var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Work Model
 * ==========
 */

var Work = new keystone.List('Work', { sortable: true });

Work.add({
	name: { type: Types.Text, initial: true, required: true },
	position: { type: Types.Text, initial: true, required: true },
	responsibilities: { type: Types.TextArray, default: []},
	url: { type: Types.Url, initial: true, required: true},
	image: { type: Types.Url, initial: true, required: true, default: '/img/work/samples/vh.png' },
});


/**
 * Registration
 */

Work.defaultColumns = 'name, position, url';
Work.register();
