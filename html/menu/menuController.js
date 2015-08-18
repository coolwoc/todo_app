(function () {

	'use strict';

	angular.module('app.menu',[])
	.controller('MenuController', MenuController)
	.directive('panelAnimates', panelAnimates);

	function MenuController( Menulist, Projectlist, Projectlabel, Projectfilter, $stateParams ) {

		var MenuController = this;

		MenuController.menuList = Menulist.query();
		MenuController.projectList = Projectlist.query();
		MenuController.projectLabel = Projectlabel.query();
		MenuController.projectFilter = Projectfilter.query();

	}

	function panelAnimates() {

		var directive = {
			link: link,
			restrict: 'A'
		};

		return directive;

		function link  (scope, elem, attrs) {

			elem.on('click', function() {
				$('.wrapper').toggleClass('panelAnimates');
	            $('.content .closeBtn').find('span').html($('.content .closeBtn').find('span').text() == 'Open' ? 'Close' : 'Open');
			});
		}
	}

})();