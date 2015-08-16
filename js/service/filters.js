(function() {

	'use strict';

	angular.module('app.global',[])

		.filter('pagination', function () {

			return function ( input, start ) {

				start = +start;
				return input.slice(start);

			};
		});

})();