var keystone = require('keystone');
var nodemailer = require('nodemailer');
var https = require('https');

exports.send = function(req, res){
	var jsonResponse = {
		messages: []
	};

	var emailRegex = new RegExp(/^[a-z0-9]+((-|_|\.)[a-z0-9]+)*(-|_|\.)*@[a-z0-9]+((-|_|\.)[a-z0-9]+)*(\.[a-z]+)$/i);
	var textRegex = new RegExp(/[\\\+\*\^\[\(\)\|\}\°\¬\!\"\#\/\=\'\¡\¨\´\;\:\~\&\>\<]/i);
	var valid = true;

	if(!req.body.name){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Name is required');
	}else if(req.body.name.match(textRegex)){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Name has non-valid characters');
	}else if(req.body.name.length > 50){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Name\'s max length is 50 characters');
	}

	if(!req.body.email.match(emailRegex)){
		jsonResponse.status = 'invalid';
		if(!req.body.email){
			jsonResponse.messages.push('Email is required');
		}else{
			jsonResponse.messages.push('Email is not valid');
		}
	}else if(req.body.email.length > 100){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Email\'s max length is 100 characters');
	}

	if(!req.body.subject){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Subject is required');
	}else if(req.body.subject.match(textRegex)){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Subject has non-valid characters');
	}else if(req.body.subject.length > 100){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Subject\'s max length is 100 characters');
	}

	if(!req.body.message){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Message is required');
	}else if(req.body.message.match(textRegex)){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Message has non-valid characters');
	}else if(req.body.message.length > 500){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Message\'s max length is 500 characters');
	}

	if(!req.body.recaptcha){
		jsonResponse.status = 'invalid';
		jsonResponse.messages.push('Recaptcha is required');
	}

	if(jsonResponse.status !== 'invalid'){
		https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.RECAPTCHA_SECRET + "&response=" + req.body.recaptcha, function(response) {
            var data = "";
            response.on('data', function (chunk) {
                    data += chunk.toString();
            });

            response.on('end', function() {
                try {
                    var parsedData = JSON.parse(data);
                   	
                   	if(!parsedData.success){
                   		jsonResponse.status = 'invalid';
                   		jsonResponse.messages.push('Recaptcha failed');
                   		res.status(200).json(jsonResponse);
                   	}else{
						var transporter = nodemailer.createTransport({
							service: 'gmail',
							auth: {
								user: process.env.EMAIL,
								pass: process.env.PASS
							}
						});

						var mailData = {
						    from: ('"' + req.body.name + '" ' + '<' + req.body.email + '>'),
						    replyTo: req.body.email,
						    to: process.env.EMAIL,
						    subject: ('VH Website / ' + req.body.name + ' - ' + req.body.subject),
						    text: req.body.message,
						};

						transporter.sendMail(mailData, function(error, info){
						    if(error){
						    	jsonResponse.status = 'error';
						        console.log(error);
						    }else{
						    	jsonResponse.status = 'success';
						    	jsonResponse.messages.push('Email Sent!');
						    }

						    res.status(error ? 500 : 200).json(jsonResponse);
						});
                   	}
                } catch (ex) {
					jsonResponse.status = 'error';
                	console.log(ex);
                	res.status(500).json(jsonResponse);
                }
            });
        });
	}else{
		res.status(200).json(jsonResponse);
	}	
}