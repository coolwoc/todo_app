(function () {

	'use strict';

	angular.module('app.menu',[])
	.controller('MenuController', MenuController);

	function MenuController( Menulist, Projectlist, Projectlabel, Projectfilter, $stateParams ) {

		var MenuController = this,
			$finishPanel = $('.overview li a'),
			$target = $('wrapper');

		$(document).on("click", $finishPanel, function() {

            $target.toggleClass('panelAnimates');
            $('.closeBtn span')
            	.html($('.closeBtn span').text() == 'Open' ? 'Close' : 'Open');
            //$('.closeBtn').hide();

        });

		MenuController.menuList = Menulist.query();
		MenuController.projectList = Projectlist.query();
		MenuController.projectLabel = Projectlabel.query();
		MenuController.projectFilter = Projectfilter.query();

	}

})();