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
	image: { 
		type: Types.LocalFile, 
		dest: process.env.CLOUD_DIR || './upload',  
		prefix:  ' ',
		allowedTypes: ['image/jpeg', 'image/png'],
		filename: function(item, file){
			return item.id + '.' + file.extension
		},
		format: function(item, file){
			return '<a href="/' + file.filename + '" target="_blank"><img src="/' + file.filename + '" style="max-width: 100px;" /></a>'
		}
	}
});


/**
 * Registration
 */

Sample.defaultColumns = 'project, url, image';
Sample.register();
