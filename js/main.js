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

	.config(config);
	//.run(run);

	function config($urlRouterProvider, $httpProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('login', {
				url:'',
				views: {
					'content@': {
						templateUrl: 'html/login/login.index.html',
						controller: 'LoginController',
						controllerAs: 'login',
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
						controllerAs: 'menuData',
						data : {
							roleAdmin: true,
							roleUser: true,
							roleGuest: true
						}
					},
					'content@': {
						templateUrl: 'html/content/content.index.html',
						controller: 'Contentcontroller',
						controllerAs: 'content',
						data : {
							roleAdmin: true,
							roleUser: true,
							roleGuest: true
						}
					}
				}
			});
	}
	
	/*
	function run( $scopeRoute, $location ) {

		//
		// roles routes with authentication should be here.
		// we also need to inject in run() the authentication
		//

		$rootScope.$on('$stateChangeStart', function( event, toState, toParams, fromState, fromParams ) {

			console.log('stateChange');
			//event.preventDefault();

		});

		$rootScope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams ) {
			console.log(stateChangeSuccess);
		});
	}
	*/
})();