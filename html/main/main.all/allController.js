(function () {

	'use strict';

	angular.module('app.alltodo', [
		'app.alltodo.create',
		'app.alltodo.edit'
	])
	.config(config)
	.controller('AlltaskController', AlltaskController);

	function config ( $stateProvider ) {

		$stateProvider
			.state('app.all', {
				url:'/alltask/:id',
				views: {
					'utilities@app': {
						templateUrl: 'html/utilities/utilities.index.html',
						controller: 'UtilitiesController',
						controllerAs: 'utilities'
					},
					'main@app': {
						params:['id'],
						templateUrl: 'html/main/main.all/all.index.html',
						controller: 'AlltaskController',
						controllerAs: 'todo'
					}
				}
			});
	}

	function AlltaskController ( Alltasks, $state, isId ) {

		var alltaskController = this;
			alltaskController.numberCurrent = 0;

			
		
		alltaskController.pageSize = 3;
		alltaskController.allTasks = Alltasks.query();
		
		alltaskController.numberOfPages =  function () {
			return Math.ceil(alltaskController.allTasks.length / alltaskController.pageSize);
		};

		alltaskController.removeTask = function (task) {
			Alltasks.delete({}, {'id': task.id}, function () {
			    alltaskController.allTasks = Alltasks.query();
			});
		};
		
		alltaskController.editTask = function (task) {
			isId.addIdData(task.id);
			$state.go('app.edit');
		};
		
	}

})();