var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * HiddenDialogue Model
 * ==========
 */

var HiddenDialogue = new keystone.List('HiddenDialogue', { 
	sortable: true,
	map: { name: 'text' }
});

HiddenDialogue.add({
	text: { type: Types.Textarea, initial: true, max: 160, required: true },
	isSecret: { type: Types.Boolean, initial: true }
});


/**
 * Registration
 */

HiddenDialogue.defaultColumns = 'text, isSecret';
HiddenDialogue.register();
