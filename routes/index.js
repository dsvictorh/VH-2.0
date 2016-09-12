/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var bodyParser = require('body-parser');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

keystone.set('403', function (req, res, next) {
	res.status(403).render('errors/403',  { layout: 'error' });
});

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404',  { layout: 'error' });
});

keystone.set('500', function (req, res, next) {
	res.status(500).render('errors/500',  { layout: 'error' });
});

keystone.set('503', function (req, res, next) {
	res.status(503).render('errors/503',  { layout: 'error' });
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	app.use(bodyParser.json());
	
	// Views
	app.get('/', routes.views.index);
	app.get('/samples', routes.views.samples);
	app.get('/legacy', routes.views.indexOld);

	//API
	app.post('/api/mail/send', keystone.middleware.api, routes.api.mail.send);
	app.get('/api/hiddenDialogue/list', keystone.middleware.api, routes.api.hiddenDialogue.list);
	app.get('/api/skill/first', keystone.middleware.api, routes.api.skill.getFirst);
	app.get('/api/skill/:id', keystone.middleware.api, routes.api.skill.get);
	app.get('/api/question/random', keystone.middleware.api, routes.api.question.getRandom);
	app.get('/api/sample/list', keystone.middleware.api, routes.api.sample.list);

	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
