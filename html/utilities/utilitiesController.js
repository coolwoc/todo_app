(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController( $localStorage, $state, $timeout ) {
		
		var utilitiesController = this;
		utilitiesController.time = new Date();

		// get user from localStorage provieder.
		utilitiesController.userIs = $localStorage.username;

		// logOut
		utilitiesController.logOut = function() {

			$('.content').fadeOut('fast');

			var logOutApp = function() {
				delete $localStorage.username;
				$state.go('login');
			};
			
			$timeout(logOutApp, 9000);
		};
	} 

})();