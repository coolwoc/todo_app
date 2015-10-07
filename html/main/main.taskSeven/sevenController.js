(function () {

	'use strict';

	angular.module('app.next',[])
	.config(config)
	.controller('controllerNextDays', controllerNextDays);

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
						controller: 'controllerNextDays',
						controllerAs: 'nextSeven'
					}
				}
			});
	}

	function controllerNextDays ( Alltasks, $state ) {

		var controllerNextDays = this;

		var today = new Date();
		controllerNextDays.todayDate = moment(today).format('L');
		controllerNextDays.weekDate = moment().weekday(7).format('L');

		controllerNextDays.nextSevenEvents = Alltasks.query({}, function() {

			var arrayPos = [];

			angular.forEach(controllerNextDays.nextSevenEvents, function (value, key) {

				var greaterThanSeven = ( moment(value.dateNum).format('L') >= controllerNextDays.todayDate ),
					lessThanSeven = moment(value.dateNum).format('L') <= controllerNextDays.weekDate;

				if ( greaterThanSeven &&  lessThanSeven ) {
					arrayPos.push(value);
				}
				
			});

			controllerNextDays.nextSevenEvents = arrayPos;

		});
	}

})();