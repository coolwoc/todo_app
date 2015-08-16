(function () {

	'use strict';

	angular.module('app.main',[])
	//.config(config)
	.controller('MainController', MainController);

/*
	function config ( $stateProvider, $urlRouterProvider ) {

		$stateProvider
			.state('app.all', {
				url:'/allTasks',
				abstract: false,
				views: {
					'utilities@app': {
						templateUrl: 'html/utilities/utilities.index.html',
						controller: 'UtilitiesController',
						controllerAs: 'Utilities'
					},
					'main@app': {
						templateUrl: 'html/main/main.index.html',
						controller: 'MainController'
					}

				}
			});
	}
*/
	function MainController() {}

})();