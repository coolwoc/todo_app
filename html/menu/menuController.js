(function () {

	'use strict';

	angular.module('app.menu',[])
	.controller('MenuController', MenuController)
	.directive('elmPanel', elmPanel);

	function MenuController( Menulist, Projectlist, Projectlabel, Projectfilter, $stateParams ) {

		var MenuController = this;

		MenuController.menuList = Menulist.query();
		MenuController.projectList = Projectlist.query();
		MenuController.projectLabel = Projectlabel.query();
		MenuController.projectFilter = Projectfilter.query();

	};

	function elmPanel() {

		var directive = {
			link: link,
			restrict: 'A'
		}

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