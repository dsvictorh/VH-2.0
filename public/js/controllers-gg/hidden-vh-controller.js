vh.controller('HiddenVHController', ['$scope', '$http', function($scope, $http){
	$scope.runSequence = function(){
		$http({
			url: '/api/hiddenDialogue/list',
			type: 'GET',
			dataType: 'json',
			data: {
				isSecret: false
			},
		}).then(function(response){
			console.log(response);
		}, function(error){
			$scope.messages = ['An error has occured. Please contact the admin and try again later'];
		});
	}
}]);