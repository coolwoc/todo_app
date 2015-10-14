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

		var AlltaskController = this;
			AlltaskController.numberCurrent = 0;
		
		AlltaskController.pageSize = 3;
		AlltaskController.allTasks = Alltasks.query();
		
		AlltaskController.numberOfPages =  function () {
			return Math.ceil(AlltaskController.allTasks.length / AlltaskController.pageSize);
		};		
		AlltaskController.removeTask = function (task) {
			Alltasks.delete({}, {'id': task.id}, function () {
			    AlltaskController.allTasks = Alltasks.query();
			});
		};
		AlltaskController.editTask = function (task) {
			isId.addIdData(task.id);
			$state.go('app.edit');
		};
		
	}

})();