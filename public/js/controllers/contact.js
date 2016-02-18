vh.controller('contact', function($scope){
	var sending = false;
	$scope.classes = '';
	$scope.messages = [];

	$scope.sendMail = function(e){
		var form = $(e.target);
		var data = {};
		data.name = form.find('[name="name"]').val();
		data.email = form.find('[name="email"]').val();
		data.message = form.find('[name="message"]').val();
		data.recaptcha = grecaptcha.getResponse();
		sending = true;

		$.ajax({
			url: '/api/mail/send',
			type: 'POST',
			dataType: 'json',
			data: data,
		}).done(function(data){
			$scope.messages = data.messages;

			if(data.status === 'success'){
				form.get(0).reset();
			}
		}).fail(function(){
			$scope.messages = ['An error has occured. Please contact the admin and try again later'];
		}).always(function(data){
			$scope.classes = (data.status || 'error') + ' active';
			$scope.$apply();

			setTimeout(function(){
				$scope.classes = $scope.classes.replace('active', '');
				$scope.$apply();
				sending = false;
			}, 2000);
		});
	
		return false;
	}

	$scope.lockSend = function(e){
		if(sending){
			e.preventDefault();
		}
	}
});