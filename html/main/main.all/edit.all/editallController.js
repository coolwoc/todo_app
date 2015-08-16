(function () {
	
	'use strict';

	angular.module('app.alltodo.edit',[
		'app.alltodo'
	])
	.config(config)
	.controller('EdittodoController', EdittodoController );

	function config ( $stateProvider ) {

		$stateProvider
			.state('app.edit', {

				url: '/alltask/edit',
				views: {

					'overlay@': {
						templateUrl: '/html/main/main.all/edit.all/edit.all.html',
						controller: 'EdittodoController',
						controllerAs: 'editTodo'
						
					},
					'main@app': {
						templateUrl: 'html/main/main.all/all.index.html',
						controller: 'AlltaskController',
						controllerAs: 'todo'
					}

				}
			});
	}

	function EdittodoController ( isId, Alltasks, $state ) {

		var EdittodoController = this;
		var editId = isId.getIdData();

		EdittodoController.idEdit = editId[0];
		EdittodoController.task = Alltasks.get({},{'id': editId[0]});

		EdittodoController.editTask = function() {
			
			EdittodoController.newTask = {

				id: editId[0],
				project: EdittodoController.task.project,
				label: EdittodoController.task.label,
				name: EdittodoController.task.name,
				dateNum: EdittodoController.task.dateNum,
				headerComment: EdittodoController.task.headerComment,
				comment: EdittodoController.task.comment
			};

			EdittodoController.newTask.dateNum = new Date (EdittodoController.task.dateNum);
			Alltasks.update(EdittodoController.newTask);
			$state.go('app.all');

		}

	}

})();