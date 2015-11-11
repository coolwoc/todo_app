(function () {

	'use strict';

	angular.module('app.alltodo.create',[
		'app.alltodo'
	])
	.config(config)
	.controller('CreatetodoController', CreatetodoController);

	function config ( $stateProvider ) {

		$stateProvider
			.state('app.create', {

				url: '/alltask/create',
				views: {
					'overlay@': {
						templateUrl: '/html/main/main.all/create.all/create.all.html',
						controller: 'CreatetodoController',
						controllerAs: 'createTodo'
					},
					'main@app': {
						templateUrl: 'html/main/main.all/all.index.html',
						controller: 'AlltaskController',
						controllerAs: 'todo'
					}
				}

			});
	}

	function CreatetodoController ( Alltasks, Projectlabel, Login ) {

		var createtodoController = this;

		createtodoController.submitted = false;

		createtodoController.priority = Projectlabel.query();

		createtodoController.username = Login.query({}, function() {

			var usernameData = [];

			angular.forEach( createtodoController.username, function(value, key) {

				usernameData.push(createtodoController.username[key].username);

			});

			createtodoController.username = usernameData;

		});

		createtodoController.createTask = function () {

			if (createtodoController.formAddTasks.$valid) {

				createtodoController.data = {};

				createtodoController.data = {
					project: createtodoController.project,
					label: createtodoController.label,
					username: createtodoController.username,
					dateNum: createtodoController.dateNum,
					headerComment: createtodoController.headerComment,
					comment: createtodoController.comment,
					done: 'false'
				};

				Alltasks.save(createtodoController.data);
				Alltasks.apply();
				$('form').find('input').val('');
				$('p.msg-error').removeClass('msg-error');

			} else {

				$('form').find('p').addClass('msg-error');
				createtodoController.submitted = true;

			}
		};
		
		createtodoController.resetVal = function() {
			$('form').find('input').val('');
		};

	}

})();