vh.controller('QuestionBoxesController', ['$scope', '$rootScope', '$timeout', 'QuestionService', function($scope, $rootScope, $timeout, QuestionService){
	var locked = false;

	$scope.question = null;
	$scope.loadQuestion = function(e){
		if(!locked){
			locked = true;
			QuestionService.getRandom().then(function(response){
				$(e.target).addClass('hide');
				$timeout(function(){
					$(e.target).parent().addClass('asking');
					$scope.question = response.data.question;
				}, 1200);				
			}, function(error){
				locked = false;
				$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
			});
		}else{
			$rootScope.warnings = ['A question is already awaiting your answer'];
		}
	}
}]);