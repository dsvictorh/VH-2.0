var keystone = require('keystone');
var HiddenDialogue = keystone.list('HiddenDialogue');

exports.list = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		HiddenDialogue.model.find({ isSecret: req.body.isSecret})
			.sort('sortOrder')
			.exec(function(err, result){
				if(err)
					reject(err);

				resolve(result);
			});
	}); 

	result.then(function(result){
		jsonResponse.skills = result;
		jsonResponse.responseCode = 200;
		
	}).catch(function(err){
		jsonResponse.responseCode = 500;
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};