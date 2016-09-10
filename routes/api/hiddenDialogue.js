var keystone = require('keystone');
var HiddenDialogue = keystone.list('HiddenDialogue');

exports.list = function(req, res){
	var jsonResponse = {};

	var result = new Promise(function(resolve, reject){
		HiddenDialogue.model.find()
			.sort('sortOrder')
			.exec(function(err, result){
				if(err)
					reject(err);

				resolve(result);
			});
	}); 

	result.then(function(result){
		var secrets = result.filter(function(item){
			return item.isSecret;
		});	

		jsonResponse.skills = result.filter(function(item){
			return !item.isSecret;
		});

		if(secrets.length){
			jsonResponse.skills.push(secrets[Math.floor(Math.random() * (secrets.length - 1))]);
		}
		jsonResponse.responseCode = 200;
		
	}).catch(function(err){
		jsonResponse.responseCode = 500;
		console.log(err);
	}).then(function(){
		res.status(jsonResponse.responseCode).json(jsonResponse);
	});
};