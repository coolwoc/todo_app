(function () {

	'user strict';

	angular.module('app.register', [])
	.controller('RegisterController', RegisterController);

	function RegisterController( $state, Login ) {

		var registerController = this;

		registerController.submitRegister = function() {

			if (registerController.formRegister.$valid) {

				registerController.dataRegister = {};

				registerController.dataRegister = {

					firstName: registerController.firstName,
					lastName: registerController.lastName,
					username: registerController.username,
					mail: registerController.mail,
					password: registerController.password,
					role: 'user'

				};

				Login.save(registerController.dataRegister);
				$('form').find('input').val('');

				$state.go('app');

			} else {

				registerController.errorData = 'All fields are required';

			}
		};

		registerController.resetVal = function() {
			$('form').find('input').val('');
		}

	}

})();