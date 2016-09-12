var keystone = require('keystone');
var SampleProject = keystone.list('SampleProject');

exports.list = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		SampleProject.model.find()
			.sort('sortOrder')
			.exec(function(err, result){
				if(err)
					reject(err);

				resolve(result);
			});
	}); 

	result.then(function(result){
		jsonResponse.samples = result;
		jsonResponse.responseCode = 200;
	}).catch(function(err){
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};