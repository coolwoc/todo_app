(function () {

	'use strict';

	var app = angular.module('app', []);
	angular.module('app',[
		'ui.router',
		'ngAnimate',
		'ngResource',
		'ngStorage',
		'app.api',
		'app.global',
		'app.menu',
		'app.login',
		'app.register',
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

	.config(config)
	.run(run);

	function config($urlRouterProvider, $httpProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url:'/login',
				views: {
					'content@': {
						templateUrl: 'html/login/login.index.html',
						controller: 'LoginController',
						controllerAs: 'login'
					}
				}
			})
			.state('login.register', {
				url: '/register',
				views: {
					'content@': {
						templateUrl: 'html/register/register.index.html',
						controller: 'RegisterController',
						controllerAs: 'register'
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
	}

	function run() {
		
	}

})();