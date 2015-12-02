
// http://stackoverflow.com/questions/33675634/angularjs-pass-data-from-controller-to-app-config

(function () {

	'use strict';

	angular.module('app.api', []);

	//Login
	angular.module('app.api').factory('Login', Login);
	function Login ($resource, apibase) {
		return $resource(apibase + '/userlogin', {},
		{
			'get': 		{method: 'GET', isArray: true},
			'save': 	{method: 'POST'},
			'query': 	{method: 'GET', isArray: true},
			'delete':  	{method: 'DELETE'}
		});
	}
	angular.module('app.api').service('userService', userService); 
	function userService (store) {

		var service = this,
			currentUser = null;

		service.setCurrentUser = function(username) {
			currentUser = username;
			store.set('username', username);
			return currentUser;
		};
		service.getCurrentUser = function() {
			if(!currentUser) {
				currentUser = store.get('username');
			}
			return currentUser;
		};

	}
	angular.module('app.api').service('APIInterceptor', APIInterceptor); 
	function APIInterceptor ($rootScope, userService) {

		var service = this;

		service.request = function(config) {

			/*
				Access token here.

				var currentUser = UserService.getCurrentUser(),
		            access_token = currentUser ? currentUser.access_token : null;

		        if (access_token) {
		            config.headers.authorization = access_token;
		        }

			*/

			var currentUser = userService.getCurrentUser();
			return config;

		};
		service.responseError = function(response) {

			if (response.status === 401) {
				$rootScope.$broadcast('unauthorized');
			}
			return response;
		};

	}

	// RESTful data
	angular.module('app.api').factory('Menulist', Menulist);
	function Menulist($resource, apibase) {
		return $resource(apibase + '/mainmenu', {}, 
		{
			
			'get':    {method:'GET'},
  			'save':   {method:'POST'},
  			'query':  {method:'GET', isArray:true},
  			'delete': {method:'DELETE'}

		});
	}
	angular.module('app.api').factory('Projectlist', Projectlist);
	function Projectlist($resource, apibase) {
		return $resource(apibase + '/project', {}, 
		{
			
			'get':    {method:'GET'},
  			'save':   {method:'POST'},
  			'query':  {method:'GET', isArray:true},
  			'delete': {method:'DELETE'}

		});
	}
	angular.module('app.api').factory('Projectlabel', Projectlabel);
	function Projectlabel($resource, apibase) {
		return $resource(apibase + '/labels', {}, 
		{
			
			'get':    {method:'GET'},
  			'save':   {method:'POST'},
  			'query':  {method:'GET', isArray:true},
  			'delete': {method:'DELETE'}

		});
	}
	angular.module('app.api').factory('Projectfilter', Projectfilter);
	function Projectfilter($resource, apibase) {
		return $resource(apibase + '/filters', {}, 
		{
			
			'get':    {method:'GET'},
  			'save':   {method:'POST'},
  			'query':  {method:'GET', isArray:true},
  			'delete': {method:'DELETE'}

		});
	}
	angular.module('app.api').factory('Alltasks', Alltasks);
	function Alltasks($resource, apibase) {

		var dateJson = function ( Alltasks ) {
			Alltasks = angular.fromJson(Alltasks);
			Alltasks.dateNum = new Date (Alltasks.dateNum);
			return Alltasks;	
		};

		return $resource(apibase + '/task/:id', {id:'@id'}, 
		{
			
			'get':    {method:'GET', transformResponse: dateJson },
  			'save':   {method:'POST'},
  			'update': {method:'PUT' },
  			'query':  {method:'GET', isArray:true},
  			'remove': {method:'DELETE'},
  			'delete': {method:'DELETE'}

		});
	}

	angular.module('app.api').service('isId', isId);
	function isId () {

		var isIds = [];

		var addIdData = function (newID) {
			isIds = [];
			isIds.push(newID);
		};

		var getIdData = function () {
			return isIds;
		};

		return {
			addIdData: addIdData,
			getIdData: getIdData

		};
	}
	angular.module('app.api').factory('statuscode', statuscode);
	function statuscode() {
		return {
			isError: function(value) { 
				return (value == 1) ? true : false;
			}
		};
	}

})();

/*
	SOME AUTHENTICATION & LOGIN IDEAS.

	SimpleLogin: 
		https://github.com/cornflourblue/angular-registration-login-example

	Authorization: 
		http://jasonwatmore.com/post/2015/03/10/AngularJS-User-Registration-and-Login-Example.aspx#app

	Roles: 
		http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/
		
	Quick Role-Based Authentication:
		http://jonsamwell.com/url-route-authorization-and-security-in-angular/

*/
