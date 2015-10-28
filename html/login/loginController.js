(function () {

	'use strict';

	angular.module('app.login',[])
	.controller('LoginController', LoginController);

	function LoginController ( $location, AuthenticationService ) { 

		var loginController = this;

		(function initController() {

			// reset loginStatus
			AuthenticationService.ClearCredentials();

		})();

		loginController.submitLogin = function() {

			//loginController.dataLoading = true;

			AuthenticationService.Login(loginController.username, loginController.password, function(response) {

				if (response.success) {

					console.log('yes');
					AuthenticationService.SetCredentials(loginController.username);
					$location.path('/content');

				} else {

					console.log('nope');
					//loginController.dataLoading = false;

				}

			});



		}
	}

})();