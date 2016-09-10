vh.factory('SkillService', ['$http', function($http){
	var service = {};

	service.get = function(id){
		return $http({
			url: '/api/skill/' + id,
			type: 'GET',
			dataType: 'json',
		});
	};

	service.getFirst = function(){
		return $http({
			url: '/api/skill/first',
			type: 'GET',
			dataType: 'json',
		});
	};

	return {
		get: service.get,
		getFirst: service.getFirst
	}
}]);