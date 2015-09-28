(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $state, Login ) {

		var LoginController = this;
		LoginController.submitted = false;

		LoginController.userlogin = {};
		LoginController.userlogin = {
			email: LoginController.email,
			pass: LoginController.pass
		};

		LoginController.submitLogin = function() {

			var isValid = function() {
				$state.go('app');
			};

			var isNotValid = function() {
				$('p.errorLogin').css({'display':'block'});
			};

			LoginController.credentials = Login.query(function(){

				LoginController.credentials.forEach(function(data){
					
					(LoginController.email === data.email && LoginController.pass === data.pass) ? isValid() : isNotValid();

				});

			});

			$('input').val('');

		};

	}

	// Authentication jwt
	// https://www.youtube.com/watch?t=517&v=lDb_GANDR8U
	// https://thinkster.io/angularjs-jwt-auth

})();