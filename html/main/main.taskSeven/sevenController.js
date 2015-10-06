(function () {

	'use strict';

	angular.module('app.next',[])
	.config(config)
	.controller('NextDaysController', NextDaysController);

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
						controller: 'NextDaysController',
						controllerAs: 'nextSeven'
					}
				}
			});
	}

	function NextDaysController ( Alltasks, $state ) {

		var NextDaysController = this;

		var today = new Date();
		NextDaysController.todayDate = moment(today).format('L');
		NextDaysController.weekDate = moment().weekday(7).format('L');

		NextDaysController.nextSevenEvents = Alltasks.query({}, function() {

			var arrayPos = []

			angular.forEach(NextDaysController.nextSevenEvents, function (value, key) {

				if ( moment(value.dateNum).format('L') >= NextDaysController.todayDate && moment(value.dateNum).format('L') <= NextDaysController.weekDate ) {
					arrayPos.push(value);
				}
			});

			NextDaysController.nextSevenEvents = arrayPos;

		});
	}

})();