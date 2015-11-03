(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController( $localStorage ) {
		
		var utilitiesController = this;
		utilitiesController.time = new Date();

		// get user from localStorage.
		utilitiesController.userIs = $localStorage.username;
		
	} 

})();