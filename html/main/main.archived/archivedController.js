(function () {
	
	'use strict';

	angular.module('app.archive',[])
	.config(config)
	.controller('controllerArchive', controllerArchive);

	function config ( $stateProvider, $urlRouterProvider ) {
		
		$stateProvider
			.state('app.archive', {
				url: '/archive',
				views: {
					'utilities@app': {
					templateUrl: 'html/utilities/utilities.index.html',
					controller: 'UtilitiesController',
					controllerAs: 'utilities'
				},
				'main@app': {
					templateUrl: 'html/main/main.archived/archived.index.html',
					controller: 'controllerArchive',
					controllerAs: 'archived'
				}
			}
		});
	}

	function controllerArchive() {}

})();