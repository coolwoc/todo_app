(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $localStorage, $state, statuscode, Login ) { 

		var loginController = this;
		
		loginController.submitLogin = function() {

			loginController.userlogin = {};
			loginController.userlogin = {
				username: loginController.username,
				password: loginController.password
			};

			var loginResult = [];
			loginResult = Login.get(loginController.userlogin, function() {

				(loginResult.length != 0 && loginResult[0].password == loginController.password) ? isLogin() : notLogin();
				
			});

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

		};
	}

})();