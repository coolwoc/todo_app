(function () {

	'use strict';

	angular.module('app.api', []);

	// data - statusCode.
	angular.module('app.api').factory('Statuscode', Statuscode);
	function Statuscode() {
		return {
			isError: function(value) { 
				return (value == 1) ? true : false;
			}
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

	// Service
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
