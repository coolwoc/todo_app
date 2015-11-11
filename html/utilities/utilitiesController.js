(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController( $localStorage, $state ) {
		
		var utilitiesController = this;
		utilitiesController.time = new Date();

		// get user from localStorage provieder.
		utilitiesController.userIs = $localStorage.username;

		// logOut
		utilitiesController.logOut = function() {

			delete $localStorage.username;
			$state.go('login');

		}
		
	} 

})();