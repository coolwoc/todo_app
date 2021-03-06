(function () {

	'use strict';

	angular.module('app.next',[])
	.config(config)
	.controller('ControllerNextDays', ControllerNextDays);

	function config ( $stateProvider, $urlRouterProvider ) {

		$stateProvider
			.state('app.next', {
				url:'/next/:id',
				views: {
					'utilities@app': {
						templateUrl: 'html/utilities/utilities.index.html',
						controller: 'UtilitiesController',
						controllerAs: 'utilities'
					},
					'main@app': {
						templateUrl: 'html/main/main.taskSeven/seven.index.html',
						controller: 'ControllerNextDays',
						controllerAs: 'nextSeven'
					}
				}
			});
	}

	function ControllerNextDays ( Alltasks, $state, isId ) {

		var controllerNextDays = this;

		controllerNextDays.todayDate = moment().format('L');
		controllerNextDays.weekDate = moment().weekday(7).format('L');

		controllerNextDays.nextSevenEvents = Alltasks.query({}, function() {

			var arrayPos = [];

			angular.forEach(controllerNextDays.nextSevenEvents, function (value, key) {

				if ( moment(value.dateNum).format('L') >= controllerNextDays.todayDate && moment(value.dateNum).format('L') <= controllerNextDays.weekDate ) {
					arrayPos.push(value);
				}
				
			});

			controllerNextDays.nextSevenEvents = arrayPos;

		});

		controllerNextDays.removeTask = function (task) {
			Alltasks.delete({}, {'id': task.id}, function () {
			    AlltaskController.allTasks = Alltasks.query();
			});
		};

		controllerNextDays.editTask = function (task) {
			isId.addIdData(task.id);
			$state.go('app.edit');
		};
	}

})();