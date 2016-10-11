vh.factory('QuestionService', ['$http', function($http){
	var service = {};

	service.getRandom = function(excludedQuestions){
		return $http({
			url: '/api/question/random',
			method: 'POST',
			data: {
				exclude: excludedQuestions
			},
			dataType: 'json',
		});
	};

	return {
		getRandom: service.getRandom,
	}
}]);