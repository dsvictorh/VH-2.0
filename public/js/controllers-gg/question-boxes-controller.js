vh.controller('QuestionBoxesController', ['$scope', '$rootScope', '$timeout', 'QuestionService', function($scope, $rootScope, $timeout, QuestionService){
	var locked = false;
	
	$scope.answering = false;
	$scope.question = null;
	$scope.answerOption = {
		option: null,
	};
	$scope.loadQuestion = function(e){
		if(!locked){
			locked = true;
			QuestionService.getRandom().then(function(response){
				$(e.target).addClass('hide');
				$timeout(function(){
					$(e.target).parent().removeClass('wrong').addClass('asking');
					$scope.question = response.data.question;
				}, 1200);				
			}, function(error){
				locked = false;
				$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
			});
		}else{
			$rootScope.warnings = ['A question is already awaiting your answer'];
		}
	};

	$scope.answerQuestion = function(){
		if(!$scope.answering){
			$scope.answering = true;
			var answer = parseInt($scope.answerOption.option) || 0;
			var questionEl = $('.hide');

			if(answer == $scope.question.rightAnswer){
				questionEl.parent().addClass('right');
				$scope.question.response = $scope.question.rightAnswerResponse;
				$scope.sample = {
					text: 'hi'
				};
			}
			else{
				questionEl.parent().addClass('wrong');
				$scope.question.response = 'Incorrect! You\'ll have to try again';
			}

			$timeout(function(){
				questionEl.parent().addClass('answered');
				questionEl.removeClass('hide');
				$scope.question = null;
				$scope.answering = false;
				$scope.answerOption.option = null;
				locked = false;
			}, 4000);
		}
	};
}]);