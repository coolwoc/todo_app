(function () {

	'use strict';

	var app = angular.module('app', []);
	angular.module('app',[
		'ui.router',
		'ngAnimate',
		'ngResource',
		'angular-storage',
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

	function config( $httpProvider, $stateProvider, $urlRouterProvider ) {

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
				},
				data: {
					requireLogin: false
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
				},
				data: {
					requireLogin: false
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
						controllerAs: 'content',
					}
				},
				data: {
					requireLogin: true
				}
			});
	}

	function run($rootScope, $state ) {
		
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

			/*
			var requireLogin = toState.data.requireLogin;

			if(requireLogin === 'true') {				
				e.preventDefault();
				$state.go('app')

			} else if (requireLogin === 'false') {
				e.preventDefault();
				$state.go('login');
			}
			*/

		});
	}
	
})();