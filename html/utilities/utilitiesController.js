(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController( $cookies ) {
		
		var utilitiesController = this;
		utilitiesController.time = new Date();

		utilitiesController.userIs = $cookies.username;
		
	} 

})();