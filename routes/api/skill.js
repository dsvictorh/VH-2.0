var keystone = require('keystone');
var Skill = keystone.list('Skill');

exports.get = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		Skill.model.findById(req.params.id)
			.exec(function(err, result){
				if(err){
					jsonResponse.responseCode = 500;
					reject(err);
				}

				if(!result){
					jsonResponse.responseCode = 404;
					reject('Skill not found');
				}

				resolve(result);
			});
	}); 

	result.then(function(result){
		jsonResponse.skill = result;
		jsonResponse.responseCode = 200;
	}).catch(function(err){
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};

exports.getFirst = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		Skill.model.find()
			.sort('sortOrder')
			.limit(1)
			.exec(function(err, result){
				if(err){
					jsonResponse.responseCode = 500;
					reject(err);
				}

				if(!result.length){
					jsonResponse.responseCode = 404;
					reject('Skill not found');
				}

				resolve(result[0]);
			});
	}); 

	result.then(function(result){
		jsonResponse.skill = result;
		jsonResponse.responseCode = 200;
	}).catch(function(err){
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};