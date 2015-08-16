(function () {

	'use strict';

	angular.module('app.menu',[])
	.controller('MenuController', MenuController);

	function MenuController( Menulist, Projectlist, Projectlabel, Projectfilter, $stateParams ) {

		var MenuController = this;

		MenuController.menuList = Menulist.query();
		MenuController.projectList = Projectlist.query();
		MenuController.projectLabel = Projectlabel.query();
		MenuController.projectFilter = Projectfilter.query();

	}

})();