var keystone = require('keystone');
var Meter = keystone.list('Meter');
var Work = keystone.list('Work');
var Sample = keystone.list('Sample');
var HomePage = keystone.list('HomePage');
var Skill = keystone.list('Skill');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.scripts = [
		{url: '/js/controllers-gg/hidden-vh-controller.js'}, 
		{url: '/js/controllers-gg/skill-controller.js'}, 
		{url: '/js/services-gg/hidden-dialogue-service.js'},
		{url: '/js/services-gg/skill-service.js'}
	];

	locals.data = {
		content: null,
		hiddenDialogues: [],
		skills: []
	}

	view.on('init', function(next){

		HomePage.model.findOne()
			.exec(function(err, result){
				locals.data.content = result;
				next(err);
			});
	});

	view.on('init', function(next){

		Skill.model.find()
			.sort('sortOrder')
			.select('name')
			.exec(function(err, result){
				locals.data.skills = result;
				next(err);
			});
	});

	// Render the view
	view.render('index');
	
};
