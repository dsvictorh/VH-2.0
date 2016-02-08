var keystone = require('keystone');
var Meter = keystone.list('Meter');
var Work = keystone.list('Work');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		skills: [],
		likes: [],
		works: [],
	}

	view.on('init', function(next){
		Meter.model.find()
			.sort('sortOrder')
			.exec(function(err, result){
				locals.data.skills = result.filter(function(item){
					return item.type === 1;
				});

				locals.data.likes = result.filter(function(item){
					return item.type === 2;
				});

				next(err);
			});
	});

	view.on('init', function(next){
		Work.model.find()
			.sort('sortOrder')
			.exec(function(err, result){
				locals.data.works = result;
				next(err);
			});
	});

	// Render the view
	view.render('index');
	
};
