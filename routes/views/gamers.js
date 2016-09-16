var keystone = require('keystone');
var GamersPage = keystone.list('GamersPage');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.footerClass = 'transparent';
	locals.scripts = [
	];

	locals.data = {
		content: null,
	}

	view.on('init', function(next){
		GamersPage.model.findOne()
			.exec(function(err, result){
				locals.data.content = result;
				next(err);
			});
	});

	// Render the view
	view.render('gamers');
	
};
