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

		var edittodoController = this;
		var editId = isId.getIdData();

		edittodoController.idEdit = editId[0];
		edittodoController.task = Alltasks.get({},{'id': editId[0]});

		edittodoController.editTask = function() {
			
			edittodoController.newTask = {

				id: editId[0],
				project: edittodoController.task.project,
				label: edittodoController.task.label,
				name: edittodoController.task.name,
				dateNum: edittodoController.task.dateNum,
				headerComment: edittodoController.task.headerComment,
				comment: edittodoController.task.comment,
				done: edittodoController.task.done

			};

			edittodoController.newTask.dateNum = new Date (edittodoController.task.dateNum);
			Alltasks.update(edittodoController.newTask);
			$state.go('app.all');

		};

		edittodoController.cancelEdit = function() {
			$state.go('app.all');			
		};
		
	}

})();