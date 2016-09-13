vh.controller('QuestionBoxesController', ['$scope', '$rootScope', '$timeout', 'QuestionService', 'SampleService', function($scope, $rootScope, $timeout, QuestionService, SampleService){
	$scope.samples = [];
	$scope.answerOption = {
		option: null,
	};

	var init = function(){
		SampleService.list().then(function(response){
			$scope.samples = response.data.samples;
			for(var i = 0; i < $scope.samples.length; i++){
				$scope.samples[i].answerOption = {
					option: null
				}
			}
		}, function(error){
			$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
		});
	}

	$scope.loadQuestion = function(sample){
		QuestionService.getRandom().then(function(response){
			sample.hide = true;
			$timeout(function(){
				sample.wrong = false;
				sample.asking = true;
				sample.question = response.data.question;
			}, 1200);				
		}, function(error){
			$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
		});
	};

	$scope.answerQuestion = function(sample){
		if(!sample.answering){
			sample.answering = true;
			var answer = parseInt(sample.answerOption.option) || 0;

			if(answer == sample.question.rightAnswer){
				sample.right = true;
				sample.question.response = sample.question.rightAnswerResponse;
				sample.correct = true;
			}
			else{
				sample.wrong = true;
				sample.question.response = 'Incorrect! You\'ll have to try again';
			}

			$timeout(function(){
				sample.answered = true;
				sample.hide = false;
				sample.question = null;
				sample.answering = false;
				sample.answerOption.option = null;
			}, 4000);
		}
	};

	$scope.showSample = function(sample){
		$rootScope.modalTemplate = sample;
	}

	init();
}]);