vh.factory('SampleService', ['$http', function($http){
	var service = {};

	service.list = function(){
		return $http({
			url: '/api/sample/list',
			method: 'GET',
			dataType: 'json',
		});
	};

	return {
		list: service.list
	}
}]);