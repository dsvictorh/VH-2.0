vh.factory('QuestionService', ['$http', function($http){
	var service = {};

	service.getRandom = function(){
		return $http({
			url: '/api/question/random',
			type: 'GET',
			dataType: 'json',
		});
	};

	return {
		getRandom: service.getRandom,
	}
}]);