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

			LoginController.credentials = Login.query(function(){
				
				LoginController.credentials.forEach(function(data){
					
					if (LoginController.email == data.email && LoginController.pass == data.pass) {

						$state.go('app');

					} else {

						$('p.errorLogin').css({'display':'block'});

					}

				});

			});

			$('input').val('');

		}

	}

})();