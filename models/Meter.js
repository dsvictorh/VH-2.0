var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Meter Model
 * ==========
 */

var Meter = new keystone.List('Meter', {
	 map: { name: 'title' }
});

Meter.add({
	title: { type: Types.Text, initial: true, required: true },
	percentage: { type: Types.Number, initial: true, required: true },
	description: { type: Types.Textarea, initial: true},
	type: { type: Types.Select, initial: true, required: true, numeric: true, options: [{ value: 1, label: 'Skills' }, { value: 2, label: 'Likes' }] }
});


/**
 * Registration
 */

Meter.defaultSort = '-title';
Meter.defaultColumns = 'title, percentage, type';
Meter.register();
