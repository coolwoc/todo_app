(function () {

	'use strict';

	angular.module('app.content', [])
	.controller('Contentcontroller', Contentcontroller);

	function Contentcontroller ( $scope ) {

		// animation layout
		var $startPanel = $('.closeBtn'),
			$Target = $('.wrapper');

        $(document).on("click", $startPanel, function() {
        	$Target.toggleClass('panelAnimates');
        });	

	}

})();