(function () {

	'use strict';

	angular.module('app.next',[])
	.config(config)
	.controller('NextController', NextController);

	function config ( $stateProvider, $urlRouterProvider ) {

		$stateProvider
			.state('app.next', {
				url:'/next',
				views: {
					'utilities@app': {
						templateUrl: 'html/utilities/utilities.index.html',
						controller: 'UtilitiesController',
						controllerAs: 'utilities'
					},
					'main@app': {
						templateUrl: 'html/main/main.taskSeven/seven.index.html',
						controller: 'NextController',
						controllerAs: 'next'
					}
				}
			});
	}

	function NextController() {
		var NextController = this;
	}

})();