vh.controller('SkillController', ['$scope', '$rootScope', '$timeout', 'SkillService', function($scope, $rootScope, $timeout, SkillService){
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
					$scope.activeSkill.meterSkillPercentage1 = 0;
					$scope.activeSkill.meterSkillPercentage2 = 0;
					$scope.activeSkill.meterSkillPercentage3 = 0;
				}, 1200);

				$timeout(function(){
					$scope.activeSkill = response.data.skill;
					$scope.viewerActive = true;
					$scope.hide = false;
					locked = false;
				}, 1210);	
			}, function(error){
				locked = false;
				$rootScope.errors = ['An error has occured. Please contact the admin and try again later'];
			});
		}
	};

	init();
}]);