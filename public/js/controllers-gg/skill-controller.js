vh.controller('SkillController', ['$scope', '$http', '$timeout', 'SkillService', function($scope, $http, $timeout, SkillService){
	var locked = false;

	$scope.viewerActive = false;
	$scope.activeSkill = null;
	$scope.hide = false;

	var init = function(){
		SkillService.getFirst().then(function(response){
			$scope.viewerActive = true;
			$scope.activeSkill = response.data.skill;
		});
	};

	$scope.loadSkill = function(id){
		if($scope.activeSkill._id != id && !locked){
			locked = true;
			SkillService.get(id).then(function(response){
				$scope.viewerActive = false;
				$scope.hide = true;

				$timeout(function(){
					$scope.activeSkill = null;
				}, 1200);

				$timeout(function(){
					$scope.activeSkill = response.data.skill;
					$scope.viewerActive = true;
					$scope.hide = false;
					locked = false;
				}, 1210);	
			}, function(error){
				locked = false;
				$scope.errors = ['An error has occured. Please contact the admin and try again later'];
			});
		}
	};

	init();
}]);