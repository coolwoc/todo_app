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

	function CreatetodoController ( Alltasks, Projectlabel, User) {

		var CreatetodoController = this;

		CreatetodoController.submitted = false;

		CreatetodoController.priority = Projectlabel.query();

		CreatetodoController.user = User.query({}, function() {

			var userData = [];

			angular.forEach(CreatetodoController.user, function(value, key) {

				userData.push(CreatetodoController.user[key].name);

			});

			CreatetodoController.user = userData;
			
		});

		CreatetodoController.createTask = function () {

			if (CreatetodoController.formAddTasks.$valid) {

				CreatetodoController.data = {};

				CreatetodoController.data = {

					project: CreatetodoController.project,
					label: CreatetodoController.label,
					name: CreatetodoController.name,
					dateNum: CreatetodoController.dateNum,
					headerComment: CreatetodoController.headerComment,
					comment: CreatetodoController.comment,
					done: CreatetodoController.done
					
				};

				console.log(CreatetodoController.data.done);

				Alltasks.save(CreatetodoController.data);
				$('form').find('input').val('');
				$('p.msg-error').removeClass('msg-error');

			} else {

				$('form').find('p').addClass('msg-error');
				CreatetodoController.submitted = true;

			}
		};
		
		CreatetodoController.resetVal = function() {
			$('form').find('input').val('');
		};

	}

})();