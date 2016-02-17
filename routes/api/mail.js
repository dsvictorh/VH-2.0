var keystone = require('keystone');
var nodemailer = require('nodemailer');

exports.send = function(req, res){
	var jsonResponse = {};
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
	    subject: ('VH Website - ' + req.body.name),
	    text: req.body.message,
	};

	transporter.sendMail(mailData, function(error, info){
	    if(error){
	        return console.log(error);
	    }

	    console.log('Message sent: ' + info.response);
	});

	res.json(jsonResponse);
}