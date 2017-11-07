(function () {

	'user strict';

	angular.module('app.register', [])
	.controller('RegisterController', RegisterController);

	function RegisterController( $state, Login ) {

		var registerController = this;

		registerController.submitRegister = function() {

            registerController.dataRegister = {};

            registerController.dataRegister = {

                firstName: registerController.firstName,
                lastName: registerController.lastName,
                username: registerController.username,
                mail: registerController.mail,
                password: registerController.password,
                role: 'user'

            };

            // Save data in fake-db.json
            Login.save(registerController.dataRegister);
            
            // clear form
            registerController = {};

            $state.go('login');

		};

        registerController.resetForm = function() {
            // clear form
            registerController = {};

        };
	}

})();