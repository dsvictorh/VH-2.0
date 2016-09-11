var keystone = require('keystone');
var Question = keystone.list('Question');

exports.getRandom = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		Question.model.find()
			.sort('sortOrder')
			.sort('sortOrder')
			.exec(function(err, result){
				if(err)
					reject(err);

				resolve(result);
			});
	}); 

	result.then(function(result){
		if(result.length){
			jsonResponse.question = result[Math.floor(Math.random() * (result.length - 1))];
		}

		jsonResponse.responseCode = 200;
	}).catch(function(err){
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};