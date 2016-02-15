vh.controller('work', function($scope){
	$scope.toggle = function(e){
		$(e.target).parent().toggleClass('open');	
	}
});