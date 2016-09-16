var keystone = require('keystone');
var SpaceShooterPage = keystone.list('SpaceShooterPage');
exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		content: null,
	}

	view.on('init', function(next){
		SpaceShooterPage.model.findOne()
			.exec(function(err, result){
				locals.data.content = result;
				next(err);
			});
	});

	// Render the view
	view.render('space-shooter', {layout: 'unity'});
	
};
