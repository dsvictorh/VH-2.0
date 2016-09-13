vh.factory('EmailService', ['$http', function($http){
	var service = {};

	service.sendMail = function(mail){
		return $http({
			url: '/api/mail/send',
			method: 'POST',
			dataType: 'json',
			data: mail
		});
	};

	return {
		sendMail: service.sendMail
	}
}]);