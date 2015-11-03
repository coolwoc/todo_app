(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $cookies, $state, statuscode, Login ) { 

		var loginController = this;
		
		loginController.submitLogin = function() {

			loginController.userlogin = {};
			loginController.userlogin = {
				username: loginController.username,
				password: loginController.password
			};

			var loginResult = [];
			loginResult = Login.get(loginController.userlogin, function() {
				(loginResult.length == 1 && ( loginController.password != 'undefined' && loginResult[0].password == loginController.password) ) ? isLogin() : notLogin();
			});

			var isLogin = function() {

				// we add username to $cookie service;
				var userValue = loginController.username;
				$cookies.username = userValue;

				// re-direct to main app.
				$state.go('app');
				
			};
			var notLogin = function() {
				loginController.errorData = 'Please check username / password.';
			};

		};
	}

})();