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
		'app.login',
		'app.main',
		'app.utility',
		'app.alltodo',
		'app.next',
		'app.today',
		'app.content',
		'app.archive'
	])

	.constant('sitename', 'applocal')
	.constant('apibase', 'http://localhost:3000')
	.constant('apiversion', '/v1.0')

	.config(config);

	function config($urlRouterProvider, $httpProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url:'',
				views: {
					'content@': {
						templateUrl: 'html/login/login.index.html',
						controller: 'LoginController',
						controllerAs: 'login'
					}
				}
			})
			.state('app', {
				url: '/content',
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

		//jwtInterceptorProvider.tokenGetter.push('jwtInterceptor');
		//$httpProvider.interceptors.push('authInterceptor');

	}

})();