var keystone = require('keystone');
var SamplesPage = keystone.list('SamplesPage');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.footerClass = 'transparent';
	locals.scripts = [
		{url: '/js/controllers-gg/question-boxes-controller.js'},
		{url: '/js/services-gg/question-service.js'},
		{url: '/js/services-gg/sample-service.js'}
	];

	locals.data = {
		content: null,
	}

	view.on('init', function(next){
		SamplesPage.model.findOne()
			.exec(function(err, result){
				locals.data.content = result;
				next(err);
			});
	});

	// Render the view
	view.render('samples');
	
};
