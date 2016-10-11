var keystone = require('keystone');
var Question = keystone.list('Question');

exports.getRandom = function(req, res){
	var jsonResponse = {};
	var excludedQuestions = req.body.exclude || [];

	var result = new Promise(function(resolve, reject){
		Question.model.find({_id: { $nin: excludedQuestions}})
			.sort('sortOrder')
			.exec(function(err, result){
				if(err)
					reject(err);

				resolve(result);
			});
	}); 

	result.then(function(result){
		if(result.length){
			jsonResponse.question = result[Math.floor(Math.random() * result.length)];
		}

		jsonResponse.responseCode = 200;
	}).catch(function(err){
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};