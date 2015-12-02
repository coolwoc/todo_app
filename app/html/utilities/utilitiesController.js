(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController( $state, $timeout, userService ) {
		
		var utilitiesController = this;
		utilitiesController.time = new Date();

		// get user from localStorage provieder.
		utilitiesController.userIs = userService.getCurrentUser();

		// logOut
		utilitiesController.logOut = function() {

			$('.content').fadeOut('fast');

			var logOutApp = function() {
				store.remove(username);
				$state.go('login');
			};
			
			$timeout(logOutApp, 9000);
		};
	} 

})();