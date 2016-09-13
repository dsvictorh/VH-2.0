var keystone = require('keystone');

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


	// Render the view
	view.render('contact');
	
};
