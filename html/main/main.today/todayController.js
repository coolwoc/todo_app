(function () {

	'use strict';

	angular.module('app.today',[])
	.config(config)
	.controller('TodayController', TodayController);

	function config ( $stateProvider, $urlRouterProvider ) {

		$stateProvider
			.state('app.today', {
				url:'/today',
				views: {
					'utilities@app': {
						templateUrl: 'html/utilities/utilities.index.html',
						controller: 'UtilitiesController',
						controllerAs: 'utilities'
					},
					'main@app': {
						templateUrl: 'html/main/main.today/today.index.html',
						controller: 'TodayController',
						controllerAs: 'today'
					}
				}
			});
	}

	function TodayController() {}

})();