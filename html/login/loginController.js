(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $state, statuscode, Login ) { 

		var loginController = this;
		
		loginController.submitLogin = function() {

			loginController.userlogin = {};
			loginController.userlogin = {
				username: loginController.username,
				password: loginController.password
			}

			var loginResult = [];
			loginResult = Login.get(loginController.userlogin, function() {

				(loginResult.length == 1 && ( loginController.password != 'undefined' && loginResult[0].password == loginController.password) ) ? $state.go('app') : loginController.errorData = 'Please check username / password.';
				
			});

		}
	}

})();