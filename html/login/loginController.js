(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $state, Login ) {

		var LoginController = this;
		LoginController.submitted = false;

		LoginController.submitLogin = function() {

			LoginController.userlogin = {};
			LoginController.userlogin = {
				email: LoginController.email,
				pass: LoginController.pass
			};
			
			var loginResult = [];
 			loginResult = Login.get(LoginController.userlogin, function(){
 				(typeof(LoginController.userlogin.email) == "undefined") ? isNotValid() : isValid();
			});
				
			var isValid = function() {
				$state.go('app');
			};

			var isNotValid = function() {
				$('.errorLogin').css({'display':'block'});
			};


			$('input').val('');

		};
		

	}

})();