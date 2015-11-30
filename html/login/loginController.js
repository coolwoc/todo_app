(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $rootScope, $state, Login, userService ) { 

		var loginController = this;
		
		/*
		loginController.submitLogin = function() {

			loginController.userlogin = {};
			loginController.userlogin = {
				username: loginController.username,
				password: loginController.password
			};

			var isLogin = function() {

				// Add username to localstorage provieder.
				$localStorage.username = loginController.username;

				// clearBrowser before load next page.
				$('.formLogin').empty();

				// re-direct to main app.
				$state.go('app');

			};
			var notLogin = function() {
				loginController.errorData = 'Please check all the form fields and your credentials.';
			};

			var loginResult = [];
			loginResult = Login.get(loginController.userlogin, function() {

				(loginResult.length !== 0 && loginResult[0].password == loginController.password) ? isLogin() : notLogin();
				
			});
		};
		loginController.register = function() {

			$('.content').fadeOut('fast');

			var userRegister = function() {

				$state.go('login.register');

			};

			$timeout(userRegister, 500);
		};
		*/

		loginController.submitLogin = function () {

			loginController.userlogin = {};
			loginController.userlogin = {
				username: loginController.username,
				password: loginController.password
			};

			var loginResult = Login.get(loginController.userlogin, function () {

				userService.setCurrentUser(loginController.username);
				$rootScope.$broadcast('authorized');
				console.log(loginResult);
				$('.formLogin').empty();
				$state.go('app');

			});

		}
	}

})();