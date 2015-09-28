(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $state, Login ) {

		var LoginController = this;
		LoginController.submitted = false;

		LoginController.credentials = Login.query();

		LoginController.userlogin = {};
		LoginController.userlogin = {
			email: LoginController.email,
			pass: LoginController.pass
		};

		LoginController.submitLogin = function() {
			
			if (LoginController.email == 'admin@admin.com' && LoginController.pass == 'admin') {
			
				console.log('isLogged');
				$state.go('app');

			}

			$('input').val('');

		}

	}

})();