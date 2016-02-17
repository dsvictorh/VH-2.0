var keystone = require('keystone');
var nodemailer = require('nodemailer');
var https = require('https');
var Regex = require('regex');

exports.send = function(req, res){
	console.log('got here');
	var jsonResponse = {
		errors: []
	};

	var emailRegex = new Regex(/^[a-z0-9]+((-|_|\.)[a-z0-9]+)*(-|_|\.)*@[a-z0-9]+((-|_|\.)[a-z0-9]+)*(\.[a-z]+)$/gi);
	var textRegex = new Regex(/^[a-zA-Z0-9 _,\'\$\&\.\-?]*$/gmi);
	var valid = true;

	console.log('got regex');
	if(!textRegex.test(req.body.name)){
		valid = false;
		if(req.body.name){
			jsonResponse.errors.push('Name is required');
		}else{
			jsonResponse.errors.push('Name has non-valid characters');
		}
	}

	if(!emailRegex.test(req.body.email)){
		valid = false;
		if(req.body.email){
			jsonResponse.errors.push('Email is required');
		}else{
			jsonResponse.errors.push('Email is not valid');
		}
	}

	if(!textRegex.test(req.body.message)){
		valid = false;
		if(req.body.message){
			jsonResponse.errors.push('Message is required');
		}else{
			jsonResponse.errors.push('Message has non-valid characters');
		}
	}

console.log('got regex end');
	if(req.body.recaptcha){
		console.log('got recaptcha');
		 https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.RECAPTCHA_SECRET + "&response=" + req.body.recaptcha, function(response) {
                var data = "";
                console.log('got http');
                response.on('data', function (chunk) {
                	console.log('got chunk');
                        data += chunk.toString();
                });

                response.on('end', function() {
                	console.log('got end');
                    try {
                        var parsedData = JSON.parse(data);
                       	
                       	if(!parsedData.success){
                       		console.log('got fail');
                       		valid = false;
                       		jsonResponse.errors.push('Recaptcha failed');
                       	}else{
							if(valid){
								var transporter = nodemailer.createTransport({
									service: 'gmail',
									auth: {
										user: process.env.EMAIL,
										pass: process.env.PASS
									}
								});

								console.log('got valid');
								var mailData = {
								    from: ('"' + req.body.name + '" ' + '<' + req.body.email + '>'),
								    replyTo: req.body.email,
								    to: process.env.EMAIL,
								    subject: ('VH Website - ' + req.body.name),
								    text: req.body.message,
								};

								transporter.sendMail(mailData, function(error, info){
									console.log('got send');
								    if(error){
								    	console.log('got send error');
								    	jsonResponse.status = 'error';
								        console.log(error);
								    }else{
								    	console.log('got send sucesss');
								    	jsonResponse.status = 'success';
								    }
								});
							}else{
								jsonResponse.status = 'invalid';
								console.log('got invalid before send');
							}
                       	}
                    } catch (ex) {
						jsonResponse.status = 'error';
                    	console.log(ex);
                    }
                });
        });
	}else{
		console.log('got no recaptcha');
		jsonResponse.status = 'invalid';
		jsonResponse.errors.push('Recaptcha is required')
	}

	console.log('got send response');
	res.apiResponse(jsonResponse);
}