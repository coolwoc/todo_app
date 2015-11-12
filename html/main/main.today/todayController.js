(function () {

	'use strict';

	angular.module('app.today',[])
	.config(config)
	.controller('TodayController', TodayController);
	//.filter('filterTodayEvents', filterTodayEvents);

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

	function TodayController( Alltasks, $state, isId ) {

		var todayController = this;

		todayController.todayDate = moment().format('L');

		todayController.todoTasks = Alltasks.query({}, function() {

			var arrayPos = [];
				
			angular.forEach(todayController.todoTasks, function(value, key){

				if ( todayController.todayDate == moment(value.dateNum).format('L') ) {
					arrayPos.push(value);
				}

			});

			todayController.todoTasks = arrayPos;

		});
		TodayController.removeTask = function (task) {
			Alltasks.delete({}, {'id': task.id}, function () {
			    AlltaskController.allTasks = Alltasks.query();
			});
		};
		TodayController.editTask = function (task) {
			isId.addIdData(task.id);
			$state.go('app.edit');
		};
	}

})();