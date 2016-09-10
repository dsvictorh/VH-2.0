vh.factory('HiddenDialogueService', ['$http', function($http){
	var service = {};

	service.list = function(){
		return $http({
			url: '/api/hiddenDialogue/list',
			type: 'GET',
			dataType: 'json',
		});
	};

	return {
		list: service.list
	}
}]);