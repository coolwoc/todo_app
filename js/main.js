(function () {

	'use strict';

	var app = angular.module('app', []);
	angular.module('app',[
		'ui.router',
		'ngAnimate',
		'ngResource',
		'app.api',
		'app.global',
		'app.menu',
		'app.main',
		'app.utility',
		'app.alltodo',
		'app.next',
		'app.today',
		'app.content'
	])
	
	.constant('sitename', 'applocal')
	.constant('apibase', 'http://localhost:3000')
	.constant('apiversion', '/v1.0')

	.config(config);

	function config($stateProvider, $urlRouterProvider, $locationProvider) {

		$stateProvider
			.state('app', {
				url:'',
				views: {
					'menu': {
						templateUrl: 'html/menu/menu.index.html',
						controller: 'MenuController',
						controllerAs: 'menuData'
					},
					'content@': {
						templateUrl: 'html/content/content.index.html',
						controller: 'Contentcontroller',
						controllerAs: 'content'
					}
				}
			});

		$urlRouterProvider.otherwise('/');


		/*
		--> we need and .htaccess file to be able to navigate through the url. Make enable $locationProvieder and 
			remove #.

		$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});
		*/

	}

})();