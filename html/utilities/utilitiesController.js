(function(){

	'use strict';

	angular.module('app.utility',[])
	.controller('UtilitiesController', UtilitiesController);

	function UtilitiesController() {
		
		var UtilitiesController = this;
		UtilitiesController.time = new Date();
		
	} 

})();