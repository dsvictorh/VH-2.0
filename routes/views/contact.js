var keystone = require('keystone');
var ContactPage = keystone.list('ContactPage');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.recaptcha = true;
	locals.scripts = [
		{url: '/js/controllers-gg/contact-form-controller.js'},
		{url: '/js/services-gg/email-service.js'}
	];

	locals.data = {
		content: null,
	}

	view.on('init', function(next){
		ContactPage.model.findOne()
			.exec(function(err, result){
				locals.data.content = result;
				next(err);
			});
	});

	// Render the view
	view.render('contact');
	
};
