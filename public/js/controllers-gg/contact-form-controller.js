vh.controller('ContactFormController', ['$scope', '$rootScope', '$timeout', 'EmailService', function($scope, $rootScope, $timeout, EmailService){
	var locked = false;
	$scope.email = null;

	function resetEmail(){
		$scope.email = {
			name: '',
			email: '',
			subject: '',
			message: '',
		};
	}
	
	$scope.send = function(){
		if(!locked){
			locked = true;
			EmailService.sendMail($scope.email).then(function(response){
				if(response.data.status === 'success'){
					$rootScope.messages = response.data.messages;
					resetEmail();
				}else{
					$rootScope.warnings = response.data.messages;
				}

				locked = false;
			}, function(error){
				$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
				locked = false;
			});
		}
	}

	resetEmail();
}]);