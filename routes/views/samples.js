var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.scripts = [

	];

	locals.data = {
		content: null,
	}

	/*view.on('init', function(next){

	});

	view.on('init', function(next){

	});*/

	// Render the view
	view.render('samples');
	
};