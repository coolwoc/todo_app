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

	function CreatetodoController ( Alltasks, Projectlabel ) {

		var CreatetodoController = this;

		CreatetodoController.priority = Projectlabel.query();

		CreatetodoController.createTask = function () {

			CreatetodoController.data = {};

			CreatetodoController.data = {

				project: CreatetodoController.project,
				label: CreatetodoController.label,
				name: CreatetodoController.name,
				dateNum: CreatetodoController.dateNum,
				headerComment: CreatetodoController.headerComment,
				comment: CreatetodoController.comment
				
			};

			Alltasks.save(CreatetodoController.data);
			$('form').find('input').val('');

		};
		
		CreatetodoController.resetVal = function() {
			$('form').find('input').val('');
		};
	}

})();