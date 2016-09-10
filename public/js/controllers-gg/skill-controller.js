vh.controller('SkillController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
	$scope.viewerActive = true;
	$scope.activeSkill = 'Front-End';
	$scope.loadSkill = function(name, e){
		if($scope.activeSkill != name){
			$scope.viewerActive = false;
			$scope.activeSkill = '';

			$timeout(function(){
				$scope.activeSkill = name;
				$scope.viewerActive = true;
			}, 1210);	
		}
	}
}]);