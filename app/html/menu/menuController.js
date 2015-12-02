(function () {

	'use strict';

	angular.module('app.menu',[])
	.controller('MenuController', MenuController)
	.directive('elmPanel', elmPanel);

	function MenuController( Menulist, Projectlist, Projectlabel, Projectfilter, $stateParams, $state ) {

		var menuController = this;

		menuController.menuList = Menulist.query();
		menuController.projectList = Projectlist.query();
		menuController.projectLabel = Projectlabel.query();
		menuController.projectFilter = Projectfilter.query();

	}

	function elmPanel() {

		var directive = {
			link: link,
			restrict: 'A'
		};

		return directive;

		function link  (scope, elem, attrs) {

			elem.on('click', function(){
				var $textTarget = $('.content .closeBtn').find('span');
				$('.wrapper').toggleClass('panelAnimates');
				$textTarget.html( $textTarget.text() == 'Close' ? 'Open' : 'Close');
			});
		}
	}

})();