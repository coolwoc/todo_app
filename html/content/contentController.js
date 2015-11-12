(function () {

	'use strict';

	angular.module('app.content', [])
	.controller('Contentcontroller', Contentcontroller)
	.directive('toggleElm', toggleElm);

	function Contentcontroller ( $scope ) {}

	function toggleElm () {

		var directive = {
			link: link,
			restrict: 'A'
		};

		return directive;

		function link(scope, elem, attrs) {

			elem.on("click", function() {

	            $('.wrapper').toggleClass('panelAnimates');
	            elem.find('span').html($('.closeBtn span').text() == 'Open' ? 'Close' : 'Open');

	        });

		}

	}

})();