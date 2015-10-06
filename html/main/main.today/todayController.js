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

	function TodayController( Alltasks, $state ) {

		var TodayController = this;

		var today = new Date();
		TodayController.todayDate = moment(today).format('L');

		TodayController.todoTasks = Alltasks.query({}, function() {

			var arrayPos = [];
				
			angular.forEach(TodayController.todoTasks, function(value, key){

				if ( TodayController.todayDate == moment(value.dateNum).format('L') ) {
					arrayPos.push(value);
				}

			});

			TodayController.todoTasks = arrayPos;

		});
	}

})();