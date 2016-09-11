vh.controller('HiddenVHController', ['$scope', '$http', '$timeout', 'HiddenDialogueService', function($scope, $http, $timeout, HiddenDialogueService){
	$scope.dialogue = '';
	$scope.runSequence = function(e){
		var element = $(e.target).parent();
		if(!element.hasClass('active')){
			element.addClass('active');
			HiddenDialogueService.list().then(function(response){
				var sentenceWait = 1000;
				var interval = 0;
				$timeout(function(){
					$.each(response.data.skills, function(i, skill){
						if(skill.isSecret) interval += 1000;
						$.each(skill.text.split(''), function(j, value){
							(function(time){
								$timeout(function(){
									if(j == 0) $scope.dialogue = '';
									$scope.dialogue += value;
								}, time);
							})(interval);
							interval += 50;
						});	
						interval += sentenceWait;	
					});
				}, 1500);
			}, function(error){
				$scope.errors = ['An error has occured. Please contact the admin and try again later'];
			});
		}
	}
}]);