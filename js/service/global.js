(function () {

	'use strict';

	angular.module('app.api', []);

	// authentication - service
	angular.module('app.api').factory('AuthenticationService', AuthenticationService);
	function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService, apibase) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

        	console.log('authentication login');

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
             
            $timeout(function () {

                var response;

                UserService.GetByUsername(username)
                    .then(function (user) {
                    	
                        if (user !== null && user.password === password) {
                        	console.log('isOK!');
                            response = { success: true };
                        } else {
                        	console.log('isNOTok!');
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
						
                        callback(response);

                    });

            }, 1000);
			

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            console.log(authdata);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    }

    // Base64 encoding service used by AuthenticationService
	var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
	};

    // userService for authtenticaton.
    angular.module('app.api').factory('UserService', UserService);
    function UserService($http, apibase) {

    	var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get( apibase +'/userlogin').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get( apibase +'/userlogin' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get( apibase +'/userlogin?' + username).then(handleSuccess, handleError('Error getting user by username'));
            //return $http.get( apibase +'/userlogin').then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post( apibase +'/userlogin', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put( apibase +'/userlogin' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete( apibase +'/userlogin' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
        	console.log(res)
            return res.data;
        }

        function handleError(error) {
            return function () {
            	console.log(error);
                return { success: false, message: error };
            };
        }

    }

    /*
    angular.module('app.api').factory('UserService', UserService);
    function UserService($setTimeout, $filter, $q) {

    	var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }
        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
    */

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
