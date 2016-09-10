var vh = angular.module('vh-gg', []).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}).run(function($rootScope) {
    $rootScope.currentYear = new Date().getFullYear();
});


vh.directive('focusableObjects', function(){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){
			$(elem).find('[focus-object]').each(function(){
				$(this).attr('tabindex', '0');
			});

			$(elem).on('click', '[focus-object]', function (e) {
				$(this).blur();
			});

			$(elem).on('keyup', '[focus-object]', function (e) {
				if(e.keyCode == 13 || e.keyCode == 32){
					$(this).trigger('click');
				}
			});
		}
	}
});

vh.directive('easterEgg', function(){
	return{
		restrict: 'A',
		link: function(scope, elem, attr){
			$(elem).on('click', function (e) {
				if(!$(this).hasClass('active')){
					$(this).addClass("active");
				}
			});
		}
	}
});



