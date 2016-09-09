var vh = angular.module('vh-gg', []).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
}).run(function($rootScope) {
    $rootScope.currentYear = new Date().getFullYear();
});




