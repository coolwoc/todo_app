(function () {
	
	'use strict';

	angular.module('app.archive',[])
	.config(config)
	.controller('ArchivedController', ArchivedController);

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
						controller: 'ArchivedController',
						controllerAs: 'archived'
					}
				}
			});
	}

	function ArchivedController( $state, Alltasks ) {

		var archivedController = this;
			archivedController.numberCurrent = 0;
			archivedController.pageSize = 3;

			archivedController.allTasks = Alltasks.query();

			archivedController.numberOfPages = function() {
				return Math.ceil(archivedController.allTasks.length /archivedController.pageSize);
			}

	}

})();