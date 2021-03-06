(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $localStorage, $state, $timeout, statuscode, Login ) { 

		var loginController = this;
		
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
				loginController.userlogin = {};

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
	}

})();