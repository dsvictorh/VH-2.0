vh.controller('SkillController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	$scope.viewerActive = true;
	$scope.activeIndex = 0;
	$scope.loadSkill = function(index){
		if($scope.activeSkill != name){
			$scope.viewerActive = false;
			$scope.activeIndex = null;

			$timeout(function(){
				$scope.activeIndex = index;
				$scope.viewerActive = true;
			}, 1210);	
		}
	}
}]);